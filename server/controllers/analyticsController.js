const Event = require("../models/Event");
const Society = require("../models/Society");
const JoinRequest = require("../models/JoinRequest");

const getAnalytics = async (req, res) => {
  try {

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    const [
      totalEvents,
      activeEvents,
      pastEvents,
      totalMembers,
      events,
    ] = await Promise.all([

      Event.countDocuments({
        organizer: society._id,
      }),

      Event.countDocuments({
        organizer: society._id,
        status: {
          $in: ["Upcoming", "Ongoing"],
        },
      }),

      Event.countDocuments({
        organizer: society._id,
        status: "Completed",
      }),

      JoinRequest.countDocuments({
        society: society._id,
        status: "Accepted",
      }),

      Event.find({
        organizer: society._id,
      }).select("title totalRegistrations"),
    ]);

    // Total Registrations
    const totalRegistrations = events.reduce(
      (sum, event) => sum + (event.totalRegistrations || 0),
      0
    );

    // Most Popular Event
    let mostPopularEvent = {
      title: "N/A",
      registrations: 0,
    };

    if (events.length > 0) {
      const popular = events.reduce((max, event) =>
        event.totalRegistrations > max.totalRegistrations
          ? event
          : max
      );

      mostPopularEvent = {
        title: popular.title,
        registrations: popular.totalRegistrations,
      };
    }

    return res.status(200).json({
      success: true,
      analytics: {
        totalEvents,
        activeEvents,
        pastEvents,
        totalRegistrations,
        totalMembers,
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

module.exports = {
  getAnalytics,
};