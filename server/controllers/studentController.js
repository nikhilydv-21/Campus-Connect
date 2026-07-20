const Student = require("../models/Student");
const OTP = require("../models/Otp");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../services/emailService");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const Society = require("../models/Society");
const JoinRequest = require("../models/JoinRequest");
const mongoose = require("mongoose");
const Event = require("../models/Event");
const Notification = require("../models/Notification");
const validatePassword = require("../utils/validatePassword");

const Feedback = require("../models/Feedback");
const EventRegistration = require("../models/EventRegistration");
const Certificate = require("../models/Certificate");
const signupStudent = async (req, res) => {
  try {
    const {
      fullName,
      rollNumber,
      branch,
      year,
      email,
      contactNumber,
      password,
    } = req.body;

    if (
      !fullName ||
      !rollNumber ||
      !branch ||
      !year ||
      !email ||
      !contactNumber ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingEmail = await Student.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const existingRollNumber = await Student.findOne({
      rollNumber,
    });

    if (existingRollNumber) {
      return res.status(400).json({
        success: false,
        message: "Roll number already registered",
      });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      fullName,
      rollNumber,
      branch,
      year,
      email,
      contactNumber,
      password: hashedPassword,
    });

    const otp = generateOTP();

    const expiryTime = new Date(Date.now() + 10 * 60 * 1000);




    await OTP.create({
      email,
      otp,
      purpose: "verification",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail(
      email,
      "Campus Connect - Email Verification",
      `
      <h2>Welcome to Campus Connect</h2>
      <p>Your OTP is <b>${otp}</b></p>
      <p>This OTP is valid for 10 minutes.</p>
      `
    );

    return res.status(201).json({
      success: true,
      message: "Student registered successfully. OTP sent to your email.",
    });

  } catch (error) {
    console.error("========== ERROR ==========");
    console.error(error);
    console.error("Stack:", error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await OTP.findOne({
      email,
      purpose: "verification",
    });


    console.log("Current Time:", new Date());
    console.log("OTP Expiry:", otpRecord.expiresAt);
    console.log("Difference (ms):", otpRecord.expiresAt - new Date());

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ email });

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

    const student = await Student.findOne({ email }).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    student.isVerified = true;

    await student.save();

    await OTP.deleteOne({ email });

    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
        role: student.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      student,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Purana OTP delete
    await OTP.deleteMany({
      email,
      purpose: "verification",
    });

    // Naya OTP
    const otp = generateOTP();

    await OTP.create({
      email,
      otp,
      purpose: "verification",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail(
      email,
      "Campus Connect - OTP Verification",
      `
      <h2>Campus Connect</h2>

      <p>Your new OTP is <b>${otp}</b></p>

      <p>Valid for 10 minutes.</p>
      `
    );

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const student = await Student.findOne({ email }).select("+password");
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (!student.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      student.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
        role: student.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    student.password = undefined;
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      student,
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

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Purane forgot-password OTP delete kar do
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
      "Campus Connect - Password Reset OTP",
      `
      <h2>Password Reset</h2>

      <p>Your OTP is <b>${otp}</b></p>

      <p>This OTP is valid for 10 minutes.</p>

      <p>If you didn't request a password reset, please ignore this email.</p>
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

    const student = await Student.findOne({
      email,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    student.password = hashedPassword;

    await student.save();

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
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateStudentProfile = async (req, res) => {
  try {
    const {
      fullName,
      year,
      contactNumber,
      bio,
      skills,
      interests,
    } = req.body;

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (fullName !== undefined) {
      student.fullName = fullName;
    }
    if (year !== undefined) {
      student.year = year;
    }

    if (contactNumber !== undefined) {
      student.contactNumber = contactNumber;
    }

    if (bio !== undefined) {
      student.bio = bio;
    }

    if (skills !== undefined) {
      student.skills = skills;
    }

    if (interests !== undefined) {
      student.interests = interests;
    }

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      student,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "CampusConnect/ProfilePictures",
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Cloudinary Upload Failed",
          });
        }

        student.profilePicture = result.secure_url;
        await student.save();

        return res.status(200).json({
          success: true,
          message: "Profile picture uploaded successfully",
          profilePicture: result.secure_url,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const joinSociety = async (req, res) => {
  try {
    const { societyId } = req.params;
    const { reason } = req.body;

    // Validate Society ID
    if (!mongoose.Types.ObjectId.isValid(societyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Society ID",
      });
    }

    // Reason Required
    if (!reason || reason.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Reason is required",
      });
    }

    // Check Student
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Check Society
    const society = await Society.findById(societyId);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    // Already Requested
    const existingRequest = await JoinRequest.findOne({
      student: student._id,
      society: society._id,
    });

    if (existingRequest) {

      if (
        existingRequest.status === "Pending" ||
        existingRequest.status === "Accepted"
      ) {
        return res.status(400).json({
          success: false,
          message: `Your request is already ${existingRequest.status}`,
        });
      }

      existingRequest.status = "Pending";
      existingRequest.reason = reason.trim();

      await existingRequest.save();

      return res.status(200).json({
        success: true,
        message: "Join request sent successfully",
      });

    }
    // Create Request
    await JoinRequest.create({
      student: student._id,
      society: society._id,
      reason: reason.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Join request sent successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getAllSocieties = async (req, res) => {
  try {

    const { search, type } = req.query;

    const filter = {
      isApproved: true,
    };

    // Search by Society Name
    if (search) {
      filter.societyName = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // Filter by Society Type
    if (type) {
      filter.societyType = type;
    }

    const societies = await Society.find(filter)
      .select("logo societyName societyType")
      .sort({
        societyName: 1,
      });

    return res.status(200).json({
      success: true,
      count: societies.length,
      societies,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getSocietyDetails = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Society ID",
      });
    }

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const society = await Society.findOne({
      _id: id,
      isApproved: true,
    }).select(
      "logo societyName facultyCoordinator email societyType description vision mission secretaries jointSecretaries achievements contacts socialLinks"
    );

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const request = await JoinRequest.findOne({
      student: student._id,
      society: society._id,
    });

    let requestStatus = "None";

    if (request) {
      requestStatus = request.status;
    }

    return res.status(200).json({
      success: true,
      society,
      requestStatus,
      isJoined: requestStatus === "Accepted",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getMySocieties = async (req, res) => {
  try {

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const joinedSocieties = await JoinRequest.find({
      student: student._id,
      status: "Accepted",
    }).populate({
      path: "society",
      select: "logo societyName societyType",
    });

    return res.status(200).json({
      success: true,
      count: joinedSocieties.length,
      societies: joinedSocieties.map((item) => item.society),
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getAllEvents = async (req, res) => {
  try {
    const { search, category, society, status } = req.query;
    // Check Student
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const filter = {};

    // Hide completed events
    filter.status = {
      $in: ["Upcoming", "Ongoing"],
    };

    // Category Filter
    if (category) {
      filter.category = category;
    }

    // Society Filter
    if (society) {
      filter.organizer = society;
    }

    // Status Filter
    if (status) {
      filter.status = status;
    }

    let events = await Event.find(filter)
      .populate("organizer", "societyName logo")
      .select(
        "banner title venue date startTime endTime category status registrationMode totalRegistrations maximumParticipants organizer likes"

      )
      .sort({
        date: 1,
      });


    // Add like status for current student
    events = events.map((event) => ({
      ...event.toObject(),
      isLiked: student.likedEvents.some(
        (likedId) =>
          likedId.toString() === event._id.toString()
      ),
    }));
    // Search by Event Title or Society Name
    if (search) {
      const keyword = search.trim().toLowerCase();

      events = events.filter((event) => {
        return (
          event.title.toLowerCase().includes(keyword) ||
          event.organizer?.societyName
            ?.toLowerCase()
            .includes(keyword)
        );
      });
    }

    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const getEventDetails = async (req, res) => {
  try {

    const { id } = req.params;

    // Validate Event ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID",
      });
    }

    // Check Student
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Get Event
    const event = await Event.findById(id)
      .populate(
        "organizer",
        "societyName logo"
      );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check Registration
    const registration = await EventRegistration.findOne({
      student: student._id,
      event: event._id,
    });

    const isRegistered = !!registration;

    // Completed event can only be viewed by registered students
    if (event.status === "Completed" && !isRegistered) {
      return res.status(404).json({
        success: false,
        message: "Event not available",
      });
    }

    // Seats Left
    let seatsLeft = null;

    if (event.registrationMode === "Participant") {
      seatsLeft =
        event.maximumParticipants -
        event.totalRegistrations;
    }

    return res.status(200).json({
      success: true,
      event,
      seatsLeft,
      isRegistered,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};


const registerEvent = async (req, res) => {
  try {

    const { id } = req.params;

    // Validate Event ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID",
      });
    }

    // Check Student
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Check Event
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Event Completed
    if (event.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "This event has already ended",
      });
    }

    // Registration Deadline (Only Participant Events)
    // Registration Deadline (Only Participant Events)

    if (event.registrationMode === "Participant") {

      const deadline = new Date(event.registrationDeadline);

      // Allow registration till 11:59:59 PM of the selected date
      deadline.setHours(23, 59, 59, 999);

      if (new Date() > deadline) {

        return res.status(400).json({
          success: false,
          message: "Registration deadline has passed",
        });

      }

    }


    // Viewer Event Join Limit (Till Previous Day)

    if (event.registrationMode === "Viewer") {

      const joinDeadline = new Date(event.date);

      // Previous day
      joinDeadline.setDate(joinDeadline.getDate() - 1);

      // Previous day 11:59:59 PM
      joinDeadline.setHours(23, 59, 59, 999);

      if (new Date() > joinDeadline) {

        return res.status(400).json({
          success: false,
          message: "Viewer joining period has ended",
        });

      }

    }

    // Already Registered / Joined
    const existingRegistration =
      await EventRegistration.findOne({
        student: student._id,
        event: event._id,
      });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message:
          event.registrationMode === "Viewer"
            ? "You have already joined this event"
            : "You have already registered for this event",
      });
    }

    // Seats Full (Only Participant Events)
    if (
      event.registrationMode === "Participant" &&
      event.maximumParticipants &&
      event.totalRegistrations >=
      event.maximumParticipants
    ) {
      return res.status(400).json({
        success: false,
        message: "Registration is full",
      });
    }

    // Create Registration
    await EventRegistration.create({
      student: student._id,
      event: event._id,
    });

    // Increase Count
    event.totalRegistrations += 1;

    await event.save();

    // Notification
    await Notification.create({
      recipient: student._id,
      recipientModel: "Student",
      title:
        event.registrationMode === "Viewer"
          ? "Event Joined"
          : "Registration Successful",

      message:
        event.registrationMode === "Viewer"
          ? `You have successfully joined "${event.title}".`
          : `You have successfully registered for "${event.title}".`,

      type: "Registration",
    });

    return res.status(201).json({
      success: true,
      message:
        event.registrationMode === "Viewer"
          ? "Joined successfully"
          : "Registered successfully",
      event,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
const submitFeedback = async (req, res) => {
  try {

    const { id } = req.params;

    const { rating, comment } = req.body;

    // Validate Event ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID",
      });
    }

    // Validate Rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check Student
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Check Event
    const event = await Event.findById(id);

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
        message: "Feedback can only be submitted after event completion",
      });
    }

    // Student must be registered
    const registration =
      await EventRegistration.findOne({
        student: student._id,
        event: event._id,
      });

    if (!registration) {
      return res.status(403).json({
        success: false,
        message: "You are not registered for this event",
      });
    }

    // Already submitted
    const existingFeedback =
      await Feedback.findOne({
        student: student._id,
        event: event._id,
      });

    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: "Feedback already submitted",
      });
    }

    // Save Feedback
    await Feedback.create({

      student: student._id,

      event: event._id,

      rating,

      comment,

    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

const getMyEvents = async (req, res) => {
  try {

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const { search, status } = req.query;

    const registrations =
      await EventRegistration.find({
        student: student._id,
      })
        .populate({
          path: "event",
          populate: {
            path: "organizer",
            select: "societyName logo",
          },
        })
        .sort({ createdAt: -1 });

    let events = registrations.filter(
      (registration) => registration.event
    );

    if (search) {

      const keyword =
        search.trim().toLowerCase();

      events = events.filter((registration) =>
        registration.event.title
          ?.toLowerCase()
          .includes(keyword)
      );

    }

    if (status) {

      events = events.filter(
        (registration) =>
          registration.event.status === status
      );

    }

    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const toggleLikeEvent = async (req, res) => {
  try {

    const { id } = req.params;

    // Validate Event ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID",
      });
    }

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }



    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Already Liked
    const alreadyLiked = student.likedEvents.includes(event._id);

    if (alreadyLiked) {

      student.likedEvents.pull(event._id);

      if (event.likes > 0) {
        event.likes -= 1;
      }

      await student.save();
      await event.save();

      return res.status(200).json({
        success: true,
        liked: false,
        likes: event.likes,
        message: "Event unliked",
      });
    }

    // Like Event

    student.likedEvents.push(event._id);

    event.likes += 1;

    await student.save();
    await event.save();

    return res.status(200).json({
      success: true,
      liked: true,
      likes: event.likes,
      message: "Event liked",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getLikedEvents = async (req, res) => {
  try {

    const student = await Student.findById(req.user.id)
      .populate({
        path: "likedEvents",
        populate: {
          path: "organizer",
          select: "societyName logo",
        },
      });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const { search } = req.query;

    let events = student.likedEvents;
    // Show only upcoming/active events
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    events = events.filter((event) => {
      return (
        event.status !== "Completed" &&
        event.status !== "Cancelled" &&
        new Date(event.date) >= today
      );
    });

    // Search by Event Name or Society Name
    if (search) {
      const keyword = search.trim().toLowerCase();

      events = events.filter((event) => {
        return (
          event.title.toLowerCase().includes(keyword) ||
          event.organizer?.societyName
            ?.toLowerCase()
            .includes(keyword)
        );
      });
    }

    // Add Like Status
    events = events.map((event) => ({
      ...event.toObject(),
      isLiked: true,
    }));

    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

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

    const student = await Student.findById(req.user.id).select("+password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      student.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    student.password = await bcrypt.hash(newPassword, 10);

    await student.save();

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
const getNotifications = async (req, res) => {
  try {

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const notifications = await Notification.find({
      recipient: student._id,
      recipientModel: "Student",
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const markNotificationAsRead = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Notification ID",
      });
    }

    const notification = await Notification.findOne({
      _id: id,
      recipient: req.user.id,
      recipientModel: "Student",
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const deleteNotification = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Notification ID",
      });
    }

    const notification = await Notification.findOne({
      _id: id,
      recipient: req.user.id,
      recipientModel: "Student",
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await Notification.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const removeProfilePicture = async (req, res) => {
  try {

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    student.profilePicture = "";

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture removed successfully",
      student,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const leaveSociety = async (req, res) => {

  try {

    const { societyId } = req.params;

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const society = await Society.findById(societyId);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found"
      });
    }

    const membership = await JoinRequest.findOne({
      student: student._id,
      society: society._id,
      status: "Accepted",
    });

    if (!membership) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this society"
      });
    }

    membership.status = "Left";

    await membership.save();

    if (society.totalMembers > 0) {
      society.totalMembers -= 1;
      await society.save();
    }

    return res.status(200).json({
      success: true,
      message: "You left the society successfully"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }

};
const downloadCertificate = async (req, res) => {
  try {

    const { id } = req.params;

    const registration = await EventRegistration.findOne({
      event: id,
      student: req.user.id,
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Event registration not found",
      });
    }

    if (registration.status !== "Attended") {
      return res.status(400).json({
        success: false,
        message: "Certificate is available only for attended students",
      });
    }

    if (!registration.certificateGenerated) {
      return res.status(400).json({
        success: false,
        message: "Certificate has not been generated yet",
      });
    }

    return res.status(200).json({
      success: true,
      certificateUrl: registration.certificateUrl,
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
  signupStudent,
  verifyOTP,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  uploadProfilePicture,
  forgotPassword,
  resetPassword,
  joinSociety,
  getAllSocieties,
  getSocietyDetails,
  getMySocieties,
  getAllEvents,
  getEventDetails,
  registerEvent,
  submitFeedback,
  getMyEvents,
  toggleLikeEvent,
  getLikedEvents,
  changePassword,
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
  resendOTP,
  removeProfilePicture,
  leaveSociety,
  downloadCertificate
};