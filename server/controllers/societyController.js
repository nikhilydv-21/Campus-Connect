const Society = require("../models/Society");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/Otp");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../services/emailService");
const Announcement = require("../models/Announcement");
const JoinRequest = require("../models/JoinRequest");
const Notification = require("../models/Notification");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const validatePassword = require("../utils/validatePassword");
const Feedback = require("../models/Feedback");
const Event = require("../models/Event");
const Student = require("../models/Student");
const EventRegistration = require("../models/EventRegistration");
const axios = require("axios");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const os = require("os");
const signupSociety = async (req, res) => {
  try {
    const {
      societyName,

      email,

      password,
      confirmPassword,
    } = req.body;

    // Required Fields
    if (
      !societyName ||

      !email ||

      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Password Match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
      });
    }

    // Already Exists
    const existingSociety = await Society.findOne({
      $or: [
        { societyName: societyName.trim() },
        { email: email.trim().toLowerCase() },
      ],
    });
    if (existingSociety) {
      return res.status(400).json({
        success: false,
        message: "Society already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Society
    await Society.create({
      societyName: societyName.trim(),

      email: email.trim().toLowerCase(),

      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message:
        "Society Registration Successful. Waiting for Admin Approval.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const loginSociety = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const society = await Society.findOne({
      email,
    }).select("+password");
    console.log("Request Body:", req.body);
    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const isMatch = await bcrypt.compare(password, society.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Admin Approval Check
    if (!society.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Waiting for Admin Approval",
      });
    }
    // Society Disabled Check
    if (society.isDisabled) {
      return res.status(403).json({
        success: false,
        message:
          "Your society account has been disabled by the administrator.",
      });
    }
    const token = jwt.sign(
      {
        id: society._id,
        role: society.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    society.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      society,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const society = await Society.findOne({ email });

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    await OTP.deleteMany({
      email,
      purpose: "forgot-password",
    });

    const otp = generateOTP();

    await OTP.create({
      email,
      otp,
      purpose: "forgot-password",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail(
      email,
      "Campus Connect - Society Password Reset",
      `
      <h2>Password Reset</h2>

      <p>Your OTP is <b>${otp}</b></p>

      <p>This OTP is valid for 10 minutes.</p>

      <p>If you did not request this, please ignore this email.</p>
      `
    );

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const {
      email,
      otp,
      newPassword,
      confirmPassword,
    } = req.body;

    if (
      !email ||
      !otp ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      if (!validatePassword(newPassword)) {
        return res.status(400).json({
          success: false,
          message:
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const otpRecord = await OTP.findOne({
      email,
      purpose: "forgot-password",
    });

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const society = await Society.findOne({
      email,
    }).select("+password");

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    society.password = await bcrypt.hash(newPassword, 10);

    await society.save();

    await OTP.deleteOne({
      _id: otpRecord._id,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getSocietyProfile = async (req, res) => {
  try {

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    return res.status(200).json({
      success: true,
      society,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getJoinRequests = async (req, res) => {
  try {
    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const { search } = req.query;

    const filter = {
      society: society._id,
      status: "Pending",
    };

    const requests = await JoinRequest.find(filter)
      .populate({
        path: "student",
        select: "fullName rollNumber branch year email",
      });

    // Search by Name / Roll Number
    let filteredRequests = requests;

    if (search) {
      const keyword = search.trim().toLowerCase();

      filteredRequests = requests.filter((req) => {
        return (
          req.student?.fullname ||
          req.student?.rollNumber?.toLowerCase().includes(keyword)
        );
      });
    }

    return res.status(200).json({
      success: true,
      count: filteredRequests.length,
      requests: filteredRequests,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const acceptJoinRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request ID",
      });
    }

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const request = await JoinRequest.findOne({
      _id: id,
      society: society._id,
    }).populate("student");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Join request not found",
      });
    }

    if (request.status === "Accepted") {
      return res.status(400).json({
        success: false,
        message: "Request already accepted",
      });
    }

    request.status = "Accepted";
    await request.save();
    const Notification = require("../models/Notification");
    society.totalMembers += 1;
    await society.save();
    await Notification.create({
      recipient: request.student._id,
      recipientModel: "Student",
      title: "Join Request Accepted",
      message: `Congratulations! Your request to join ${society.societyName} has been accepted.`,
      type: "JoinRequest",
    });
    await sendEmail(
      request.student.email,
      "Campus Connect - Society Approval",
      `
  <div style="font-family:Arial,sans-serif;padding:20px;">

    <h2>Congratulations ${request.student.fullName}! 🎉</h2>

    <p>Your request to join <b>${society.societyName}</b> has been approved.</p>

    <h3 style="color:green;">
      You are now a Volunteer of ${society.societyName}.
    </h3>

    <p>
      You can now participate in society activities, events and announcements through Campus Connect.
    </p>

    <br>

    <p>Best Regards,</p>

    <h4>${society.societyName}</h4>

    <p>Campus Connect</p>

  </div>
  `
    );
    return res.status(200).json({
      success: true,
      message: "Student added as society member",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const rejectJoinRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request ID",
      });
    }

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const request = await JoinRequest.findOne({
      _id: id,
      society: society._id,
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Join request not found",
      });
    }

    if (request.status === "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Request already rejected",
      });
    }

    request.status = "Rejected";

    await request.save();

    return res.status(200).json({
      success: true,
      message: "Join request rejected successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateSocietyProfile = async (req, res) => {
  try {
    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const {
      societyName,
      societyType,
      facultyCoordinator,
      description,
      vision,
      mission,
      secretaries,
      jointSecretaries,
      achievements,
      contacts,
      socialLinks,
    } = req.body;


    const cleanedSecretaries = (secretaries || []).filter(
      (item) => item.name?.trim() !== ""
    );

    const cleanedJointSecretaries = (jointSecretaries || []).filter(
      (item) => item.name?.trim() !== ""
    );

    const cleanedAchievements = (achievements || []).filter(
      (item) =>
        item.title?.trim() !== "" ||
        item.description?.trim() !== ""
    );

    const cleanedContacts = (contacts || []).filter(
      (item) =>
        item.name?.trim() !== "" ||
        item.position?.trim() !== "" ||
        item.phone?.trim() !== ""
    );
    // Validation
    if (secretaries && secretaries.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 secretaries allowed",
      });
    }

    if (jointSecretaries && jointSecretaries.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 joint secretaries allowed",
      });
    }

    if (achievements && achievements.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 achievements allowed",
      });
    }

    if (contacts && contacts.length > 2) {
      return res.status(400).json({
        success: false,
        message: "Maximum 2 contacts allowed",
      });
    }

    society.description = description ?? society.description;
    society.vision = vision ?? society.vision;
    society.mission = mission ?? society.mission;

    if (secretaries)
      society.secretaries = cleanedSecretaries;

    if (jointSecretaries)
      society.jointSecretaries = cleanedJointSecretaries;

    if (achievements)
      society.achievements = cleanedAchievements;

    if (contacts)
      society.contacts = cleanedContacts;
    if (socialLinks) society.socialLinks = socialLinks;
    if (societyName) {
      society.societyName = societyName;
    }
    if (societyType) {
      society.societyType = societyType;
    }
    if (facultyCoordinator) {
      society.facultyCoordinator = facultyCoordinator;
    }
    await society.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      society,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const uploadSocietyLogo = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a logo",
      });
    }

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "CampusConnect/SocietyLogos",
      },

      async (error, result) => {

        if (error) {
          return res.status(500).json({
            success: false,
            message: "Cloudinary Upload Failed",
          });
        }

        society.logo = result.secure_url;

        await society.save();

        return res.status(200).json({
          success: true,
          message: "Logo uploaded successfully",
          logo: result.secure_url,
        });

      }
    );

    streamifier
      .createReadStream(req.file.buffer)
      .pipe(uploadStream);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const removeSocietyLogo = async (req, res) => {
  try {

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    society.logo = "";

    await society.save();

    return res.status(200).json({
      success: true,
      message: "Logo removed successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getMembers = async (req, res) => {
  try {

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const { search } = req.query;

    const members = await JoinRequest.find({
      society: society._id,
      status: "Accepted",
    })
      .populate({
        path: "student",
        select: "fullName rollNumber branch year email profilePicture",
      })
      .sort({
        createdAt: -1,
      });

    let filteredMembers = members;

    if (search) {

      const keyword = search.trim().toLowerCase();

      filteredMembers = members.filter((member) => {

        return (

          member.student?.fullName
            ?.toLowerCase()
            .includes(keyword)

          ||

          member.student?.rollNumber
            ?.toLowerCase()
            .includes(keyword)

        );

      });

    }

    return res.status(200).json({

      success: true,

      count: filteredMembers.length,

      members: filteredMembers,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error",

    });

  }
};
const removeMember = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request ID",
      });
    }

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const member = await JoinRequest.findOne({
      _id: id,
      society: society._id,
      status: "Accepted",
    }).populate("student");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    member.status = "Removed";

    await member.save();

    if (society.totalMembers > 0) {
      society.totalMembers -= 1;
      await society.save();
    }

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const sendAnnouncement = async (req, res) => {
  try {

    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required",
      });
    }

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const members = await JoinRequest.find({
      society: society._id,
      status: "Accepted",
    }).populate({
      path: "student",
      select: "name email",
    });

    if (members.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No members found",
      });
    }

    const announcement = await Announcement.create({
      society: society._id,
      title: title.trim(),
      message: message.trim(),
      totalRecipients: members.length,
    });

    await Promise.all(
      members.map(async (member) => {
        await Notification.create({
          recipient: member.student._id,
          recipientModel: "Student",
          title: title.trim(),
          message: message.trim(),
          type: "Announcement",

        });
        if (!member.student?.email) return;

        await sendEmail(
          member.student.email,
          `${society.societyName} Announcement`,
          `
          <div style="font-family:Arial;padding:20px;">

          <h2>${title}</h2>

          <p>Hello <b>${member.student.name}</b>,</p>

          <p>${message}</p>

          <br>

          <p>Regards,</p>

          <h3>${society.societyName}</h3>

          </div>
          `
        );

      })
    );

    return res.status(200).json({
      success: true,
      message: "Announcement sent successfully",
      announcement,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getAnnouncements = async (req, res) => {
  try {

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const announcements = await Announcement.find({
      society: society._id,
    })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: announcements.length,
      announcements,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const deleteAnnouncement = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Announcement ID",
      });
    }

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const announcement = await Announcement.findOne({
      _id: id,
      society: society._id,
    });

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    await announcement.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getAllFeedback = async (req, res) => {
  try {

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const events = await Event.find({
      organizer: society._id,
    }).select("_id title");

    const eventIds = events.map(event => event._id);

    const feedbacks = await Feedback.find({
      event: { $in: eventIds },
    })
      .populate("student", "fullName rollNumber")
      .populate("event", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};
const getEventFeedback = async (req, res) => {

  try {

    const { id } = req.params;

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found"
      });
    }

    const event = await Event.findOne({
      _id: id,
      organizer: society._id,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    const feedbacks = await Feedback.find({
      event: id,
    })
      .populate("student", "fullName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }

};
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
      });
    }
    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be same as old password",
      });
    }

    const society = await Society.findById(req.user.id).select("+password");

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      society.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    society.password = await bcrypt.hash(newPassword, 10);

    await society.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

const generateCertificates = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID",
      });
    }

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const event = await Event.findOne({
      _id: id,
      organizer: society._id,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Event must be completed
    if (event.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message:
          "Certificates can only be generated after event completion",
      });
    }

    // Viewer events not allowed
    if (event.registrationMode === "Viewer") {
      return res.status(400).json({
        success: false,
        message:
          "Certificates are not available for viewer events",
      });
    }

    // Already generated
    if (event.certificateGenerated) {
      return res.status(400).json({
        success: false,
        message:
          "Certificates have already been generated",
      });
    }

    // Fetch attended students only
    const registrations =
      await EventRegistration.find({
        event: event._id,
        status: "Attended",
      })
        .populate("student");

    if (registrations.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "No attended students found",
      });
    }

    // College Logo
    const collegeLogo = path.join(
      __dirname,
      "../assets/college-logo.png"
    );

    // Temporary folder
    const tempFolder = path.join(
      os.tmpdir(),
      "campus-connect-certificates"
    );

    if (!fs.existsSync(tempFolder)) {
      fs.mkdirSync(tempFolder, {
        recursive: true,
      });
    }

    for (const registration of registrations) {

      const student = registration.student;
      if (!student) continue;
      const pdfPath = path.join(
        tempFolder,
        `${registration._id}.pdf`
      );

      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 0,
      });

      doc.pipe(fs.createWriteStream(pdfPath));

      // Background
      doc.rect(0, 0, 842, 595).fill("#ffffff");

      doc
        .lineWidth(8)
        .strokeColor("#0f4c81")
        .rect(20, 20, 802, 555)
        .stroke();

      // College Logo

      if (fs.existsSync(collegeLogo)) {
        console.log("PATH:", collegeLogo);
        console.log("EXISTS:", fs.existsSync(collegeLogo));

        const stat = fs.statSync(collegeLogo);
        console.log("SIZE:", stat.size);

        doc.image(collegeLogo, 45, 35, {
          width: 60,
        });
       
      }

      // Society Logo
      if (society.logo) {
        try {
          const response = await axios.get(
            society.logo,
            {
              responseType: "arraybuffer",
            }
          );

          doc.image(
            Buffer.from(response.data),
            735,
            30,
            {
              width: 60,
            }
          );
        } catch (err) {
          console.log("Logo not loaded");
        }
      }

      doc
        .fontSize(28)
        .fillColor("#0f4c81")
        .font("Helvetica-Bold")
        .text(
          "CERTIFICATE OF PARTICIPATION",
          0,
          80,
          {
            align: "center",
          }
        );

      doc
        .moveTo(250, 125)
        .lineTo(590, 125)
        .strokeColor("#d4af37")
        .lineWidth(2)
        .stroke();

      doc
        .fontSize(18)
        .fillColor("black")
        .font("Helvetica")
        .text(
          "This certificate is presented to",
          0,
          170,
          {
            align: "center",
          }
        );

      doc
        .fontSize(24)
        .font("Helvetica-Bold")
        .fillColor("black")
        .text(
          student.fullName,
          0,
          210,
          {
            align: "center",
          }
        );

      doc
        .fontSize(15)
        .font("Helvetica")
        .fillColor("black")
        .text(
          `for successfully participating in the event "${event.title}" organized by ${society.societyName}. Your commitment, enthusiasm, and active involvement are sincerely appreciated. We look forward to your continued participation in future initiatives.`,
          100,
          285,
          {
            width: 640,
            align: "center",
            lineGap: 8,
          }
        );

      doc.end();

      await new Promise((resolve) => {
        doc.on("end", resolve);
      });

      const uploaded =
        await cloudinary.uploader.upload(
          pdfPath,
          {
            folder:
              "CampusConnect/Certificates",
            resource_type: "raw",
          }
        );
        console.log("===== UPLOADED =====");
console.log(uploaded);
console.log("====================");

      registration.certificateGenerated = true;

      registration.certificateUrl = uploaded.secure_url;



      await registration.save();

      fs.unlinkSync(pdfPath);
    }
    event.certificateGenerated = true;

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Certificates generated successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
module.exports = {
  signupSociety,
  loginSociety,
  forgotPassword,
  resetPassword,
  getSocietyProfile,
  getJoinRequests,
  acceptJoinRequest,
  rejectJoinRequest,
  updateSocietyProfile,
  uploadSocietyLogo,
  removeSocietyLogo,
  getMembers,
  removeMember,
  sendAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
  getAllFeedback,
  getEventFeedback,
  changePassword,
  generateCertificates
};