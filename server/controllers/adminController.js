const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const Society = require("../models/Society");
const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");
const JoinRequest = require("../models/JoinRequest");
const sendEmail = require("../services/emailService");

// ================= LOGIN =================

const loginAdmin = async (req, res) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        username,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Admin Login Successful",
      token,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ================= PENDING SOCIETIES =================

const getPendingSocieties = async (req, res) => {
  try {

    const societies = await Society.find({
      isApproved: false,
    }).select("-password");

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

// ================= APPROVE SOCIETY =================

const approveSociety = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Society ID",
      });
    }

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    if (society.isApproved) {
      return res.status(400).json({
        success: false,
        message: "Society is already approved",
      });
    }

    society.isApproved = true;

    await society.save();

    await sendEmail(
      society.email,
      "Campus Connect - Society Account Approved",
      `
      <h2>Congratulations 🎉</h2>

      <p>Your society registration has been approved.</p>

      <p>You can now login and start using Campus Connect.</p>
      `
    );

    return res.status(200).json({
      success: true,
      message: "Society approved successfully",
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
const getAdminDashboard = async (req, res) => {
  try {

    const totalStudents = await Student.countDocuments();

    const totalSocieties = await Society.countDocuments({
      isApproved: true,
    });

    const pendingSocieties = await Society.countDocuments({
      isApproved: false,
    });

    const totalEvents = await Event.countDocuments();

    const activeEvents = await Event.countDocuments({
      status: {
        $in: ["Upcoming", "Ongoing"],
      },
    });

    const pastEvents = await Event.countDocuments({
      status: "Completed",
    });

    const totalRegistrations = await EventRegistration.countDocuments();

    const mostPopularEvent = await Event.findOne()
      .populate("organizer", "societyName")
      .sort({ totalRegistrations: -1 })
      .select("title totalRegistrations organizer");
    return res.status(200).json({
      success: true,
      dashboard: {
        totalStudents,
        totalSocieties,
        pendingSocieties,
        totalEvents,
        activeEvents,
        pastEvents,
        totalRegistrations,
        mostPopularEvent,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const rejectSociety = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Society ID",
      });
    }

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    await sendEmail(
      society.email,
      "Campus Connect - Society Registration Rejected",
      `
      <h2>Society Registration Rejected</h2>

      <p>Dear <b>${society.societyName}</b>,</p>

      <p>
      We are sorry to inform you that your society registration has been rejected by the administrator.
      </p>

      <p>
      You may contact the administrator for further information.
      </p>

      <br>

      <h3>Campus Connect Team</h3>
      `
    );

    await Society.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Society rejected successfully",
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

    const { search } = req.query;

    let filter = {
      isApproved: true,
    };

    if (search) {
      filter.societyName = {
        $regex: search,
        $options: "i",
      };
    }

    const societies = await Society.find(filter)
      .select("-password")
      .sort({
        createdAt: -1,
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

    const society = await Society.findById(id)
      .select("-password");

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const totalMembers = await JoinRequest.countDocuments({
      society: society._id,
      status: "Accepted",
    });
    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }



    return res.status(200).json({
      success: true,
      society,
      totalMembers,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getAllStudents = async (req, res) => {
  try {

    const { search, branch, year } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          rollNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (branch) {
      filter.branch = branch;
    }

    if (year) {
      filter.year = Number(year);
    }

    const students = await Student.find(filter)
      .select("-password")
      .populate(
        "joinedSocieties", "societyName logo"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getStudentDetails = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID",
      });
    }

    const student = await Student.findById(id)
      .select("-password")
      .populate({
        path: "likedEvents",
        select: "title",
      });


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
      select: "societyName logo",
    });

    const registeredEvents = await EventRegistration.find({
      student: student._id,
    }).populate({
      path: "event",
      populate: {
        path: "organizer",
        select: "societyName logo",
      },
    });

    return res.status(200).json({
      success: true,
      student: {
        ...student.toObject(),
        joinedSocieties: joinedSocieties.map(
          (item) => item.society
        ),
      },
      registeredEvents,
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

    const { search, category, status } = req.query;

    const events = await Event.find()
      .populate({
        path: "organizer",
        select: "societyName logo",
      })
      .sort({
        createdAt: -1,
      });

    let filteredEvents = events;

    // Search
    if (search) {

      const keyword = search.trim().toLowerCase();

      filteredEvents = filteredEvents.filter((event) => {

        return (

          event.title
            ?.toLowerCase()
            .includes(keyword)

          ||

          event.organizer?.societyName
            ?.toLowerCase()
            .includes(keyword)

        );

      });

    }

    // Category
    if (category) {

      filteredEvents = filteredEvents.filter(

        (event) => event.category === category

      );

    }

    // Status
    if (status) {

      filteredEvents = filteredEvents.filter(

        (event) => event.status === status

      );

    }

    return res.status(200).json({

      success: true,

      count: filteredEvents.length,

      events: filteredEvents,

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID",
      });
    }

    const event = await Event.findById(id)
      .populate({
        path: "organizer",
        select:
          "societyName logo email facultyCoordinator societyType description vision mission",
      });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const registrations = await EventRegistration.countDocuments({
      event: event._id,
    });

    const seatsLeft =
      event.maximumParticipants === null
        ? "Unlimited"
        : event.maximumParticipants - registrations;

    return res.status(200).json({
      success: true,
      event,
      registrations,
      seatsLeft,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getAnalytics = async (req, res) => {
  try {

    const totalStudents = await Student.countDocuments();

    const totalSocieties = await Society.countDocuments({
      isApproved: true,
    });

    const totalMembers = await JoinRequest.countDocuments({
      status: "Accepted",
    });

    const totalEvents = await Event.countDocuments();

    const activeEvents = await Event.countDocuments({
      status: {
        $in: ["Upcoming", "Ongoing"],
      },
    });

    const pastEvents = await Event.countDocuments({
      status: "Completed",
    });

    const totalRegistrations =
      await EventRegistration.countDocuments();

    const mostPopularEvent = await Event.findOne()
      .sort({
        totalRegistrations: -1,
      })
      .select("title totalRegistrations");

    const mostActiveSociety = await Event.aggregate([
      {
        $group: {
          _id: "$organizer",
          totalEvents: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalEvents: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "societies",
          localField: "_id",
          foreignField: "_id",
          as: "society",
        },
      },
      {
        $unwind: "$society",
      },
      {
        $project: {
          societyName: "$society.societyName",
          logo: "$society.logo",
          totalEvents: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,

      analytics: {

        totalStudents,

        totalSocieties,

        totalMembers,

        totalEvents,

        activeEvents,

        pastEvents,

        totalRegistrations,

        mostPopularEvent,

        mostActiveSociety:
          mostActiveSociety.length > 0
            ? mostActiveSociety[0]
            : null,

      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const deleteSociety = async (req, res) => {
  try {

    const { id } = req.params;

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    await Society.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Society deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const disableSociety = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Society ID",
      });
    }

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    society.isDisabled = !society.isDisabled;

    await society.save();

    return res.status(200).json({
      success: true,
      message: society.isDisabled
        ? "Society disabled successfully"
        : "Society enabled successfully",
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
module.exports = {
  loginAdmin,
  getPendingSocieties,
  approveSociety,
  getAdminDashboard,
  rejectSociety,
  getAllSocieties,
  getSocietyDetails,
  getSocietyDetails,
  getAllStudents,
  getStudentDetails,
  getAllEvents,
  getEventDetails,
  getAnalytics,
  deleteSociety,
  disableSociety

};