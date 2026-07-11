const Event = require("../models/Event");
const Society = require("../models/Society");
const mongoose = require("mongoose");
const validateEvent = require("../utils/validateEvent");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const EventRegistration = require("../models/EventRegistration");
const Student = require("../models/Student");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");
const Feedback = require("../models/Feedback");
const updateEventStatus = async (event) => {
  const now = new Date();

  const eventDate = new Date(event.date);

  const [startHour, startMinute] =
    event.startTime.split(":").map(Number);

  const [endHour, endMinute] =
    event.endTime.split(":").map(Number);

  const startDateTime = new Date(eventDate);
  startDateTime.setHours(
    startHour,
    startMinute,
    0,
    0
  );

  const endDateTime = new Date(eventDate);
  endDateTime.setHours(
    endHour,
    endMinute,
    0,
    0
  );

  let newStatus = event.status;
  let registrationOpen = event.isRegistrationOpen;

  if (now < startDateTime) {

    newStatus = "Upcoming";

    if (now > new Date(event.registrationDeadline)) {
      registrationOpen = false;
    } else {
      registrationOpen = true;
    }

  } else if (
    now >= startDateTime &&
    now <= endDateTime
  ) {

    newStatus = "Ongoing";
    registrationOpen = false;

  } else {

    newStatus = "Completed";
    registrationOpen = false;

  }

  if (
    newStatus !== event.status ||
    registrationOpen !== event.isRegistrationOpen
  ) {
    event.status = newStatus;
    event.isRegistrationOpen = registrationOpen;

    await event.save();
  }
};
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      venue,
      date,
      startTime,
      endTime,
      registrationDeadline,
      registrationMode,
      maximumParticipants,
    } = req.body;

    const validation = validateEvent(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }
    // Maximum Participants Validation
    if (registrationMode === "Participant") {

      if (
        maximumParticipants === undefined ||
        maximumParticipants === null ||
        maximumParticipants === ""
      ) {
        return res.status(400).json({
          success: false,
          message: "Maximum participants is required",
        });
      }

      if (!/^\d+$/.test(maximumParticipants.toString())) {
        return res.status(400).json({
          success: false,
          message: "Maximum participants must contain only numbers",
        });
      }

      const max = Number(maximumParticipants);

      if (!Number.isInteger(max) || max <= 0) {
        return res.status(400).json({
          success: false,
          message: "Maximum participants must be greater than 0",
        });
      }

      if (max > 10000) {
        return res.status(400).json({
          success: false,
          message: "Maximum participants cannot exceed 10000",
        });
      }

    }
    let bannerUrl = "";

    if (req.file) {

      const result = await new Promise((resolve, reject) => {

        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder: "CampusConnect/EventBanners",
            },

            (error, result) => {

              if (error) {
                return reject(error);
              }

              resolve(result);

            }
          );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(uploadStream);

      });

      bannerUrl = result.secure_url;

    }
    const eventDate = new Date(date);
    const deadline = new Date(registrationDeadline);

    // Current Date
    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Event Date Only
    const eventOnlyDate = new Date(eventDate);
    eventOnlyDate.setHours(0, 0, 0, 0);

    // Registration Deadline Only
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    // Selected Event Date Only
    const selectedDate = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    );

    // Registration deadline cannot be in the past
    if (deadlineDate < today) {
      return res.status(400).json({
        success: false,
        message: "Registration deadline cannot be in the past.",
      });
    }

    // Registration deadline cannot be after event date
    if (deadlineDate > eventOnlyDate) {
      return res.status(400).json({
        success: false,
        message: "Registration deadline cannot be after the event date.",
      });
    }

    // If event is today, start time must be in future
    if (selectedDate.getTime() === today.getTime()) {

      const [startHour, startMinute] = startTime
        .split(":")
        .map(Number);

      const eventStart = new Date(eventDate);
      eventStart.setHours(startHour, startMinute, 0, 0);

      if (eventStart <= now) {
        return res.status(400).json({
          success: false,
          message:
            "Start time must be greater than the current time for today's event.",
        });
      }

      const [endHour, endMinute] = endTime
        .split(":")
        .map(Number);

      const eventEnd = new Date(eventDate);
      eventEnd.setHours(endHour, endMinute, 0, 0);

      if (eventEnd <= now) {
        return res.status(400).json({
          success: false,
          message:
            "End time must be greater than the current time for today's event.",
        });
      }
    }
    // Minimum Event Duration = 1 Hour

    const [startHour, startMinute] = startTime
      .split(":")
      .map(Number);

    const [endHour, endMinute] = endTime
      .split(":")
      .map(Number);

    const startDateTime = new Date(eventDate);
    startDateTime.setHours(
      startHour,
      startMinute,
      0,
      0
    );

    const endDateTime = new Date(eventDate);
    endDateTime.setHours(
      endHour,
      endMinute,
      0,
      0
    );

    // End time must be after start time
    if (endDateTime <= startDateTime) {
      return res.status(400).json({
        success: false,
        message:
          "End time must be greater than start time",
      });
    }

    // Minimum duration = 1 hour
    const duration =
      endDateTime - startDateTime;

    const oneHour =
      60 * 60 * 1000;

    if (duration < oneHour) {
      return res.status(400).json({
        success: false,
        message:
          "Event duration must be at least 1 hour",
      });
    }
    // Society Check
    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    // Society Approval Check
    if (!society.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Only approved societies can create events",
      });
    }

    // Duplicate Event Check
    const existingEvent = await Event.findOne({
      organizer: society._id,
      title: title.trim(),
      date: eventDate,
    });

    if (existingEvent) {
      return res.status(400).json({
        success: false,
        message: "Event already exists on this date",
      });
    }

    // Create Event
    const event = await Event.create({
      banner: bannerUrl,
      title: title.trim(),
      description: description.trim(),
      category,
      venue: venue.trim(),
      date: eventDate,
      startTime,
      endTime,
      registrationDeadline: deadline,
      registrationMode,
      maximumParticipants:
        registrationMode === "Participant"
          ? maximumParticipants
          : null,
      organizer: society._id,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
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

    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    // Update Event Statuses
    const allEvents = await Event.find({
      organizer: society._id,
    });

    for (const event of allEvents) {
      await updateEventStatus(event);
    }

    const { search, status } = req.query;

    // Base Filter
    const filter = {
      organizer: society._id,
      status: {
        $ne: "Completed",
      },
    };

    // Search
    if (search) {
      filter.title = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // Status Filter
    if (status) {

      const allowedStatus = [
        "Upcoming",
        "Ongoing",
        "Completed",
        "Cancelled",
      ];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Status",
        });
      }

      filter.status = status;

    }

    const events = await Event.find(filter)
      .sort({
        status: 1,
        date: 1,
        startTime: 1,
      })
      .select(`
        banner
        title
        description
        category
        venue
        date
        startTime
        endTime
        status
        registrationMode
        registrationDeadline
        maximumParticipants
        totalRegistrations
        likes
        isRegistrationOpen
        organizer
      `)
      .populate({
        path: "organizer",
        select: "societyName",
      });

    // Refresh Status Again
    for (const event of events) {
      await updateEventStatus(event);
    }
    const formattedEvents = events.map((event) => ({
      ...event.toObject(),
      isLiked: society.likedEvents.some(
        (likedId) =>
          likedId.toString() === event._id.toString()
      ),
    }));
    return res.status(200).json({
      success: true,
      count: formattedEvents.length,
      events: formattedEvents,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getEventById = async (req, res) => {
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
    await updateEventStatus(event);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      event,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateEvent = async (req, res) => {
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

    // Event already started
    if (new Date(event.date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Cannot edit event after it has started",
      });
    }

    const {
      title,
      description,
      category,
      venue,
      date,
      startTime,
      endTime,
      registrationDeadline,
      registrationMode,
      maximumParticipants,
    } = req.body;

    const validation = validateEvent(req.body);
    let bannerUrl = event.banner;

    if (req.file) {

      const result = await new Promise((resolve, reject) => {

        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder: "CampusConnect/EventBanners",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(uploadStream);

      });

      bannerUrl = result.secure_url;
    }

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const eventDate = new Date(date);
    const deadline = new Date(registrationDeadline);

    // Can't reduce below registered students
    if (
      registrationMode === "Participant" &&
      maximumParticipants < event.totalRegistrations
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Maximum Participants cannot be less than registered students",
      });
    }
    const duplicateEvent = await Event.findOne({
      _id: { $ne: event._id },
      organizer: society._id,
      title: title.trim(),
      date: eventDate,
    });

    if (duplicateEvent) {
      return res.status(400).json({
        success: false,
        message: "Another event already exists with the same title and date",
      });
    }
    // Update
    event.banner = bannerUrl;
    event.title = title.trim();
    event.description = description.trim();
    event.category = category;
    event.venue = venue.trim();
    event.date = eventDate;
    event.startTime = startTime;
    event.endTime = endTime;
    event.registrationDeadline = deadline;
    event.registrationMode = registrationMode;
    event.maximumParticipants =
      registrationMode === "Participant"
        ? maximumParticipants
        : null;

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const deleteEvent = async (req, res) => {
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

    // Event already started
    if (new Date(event.date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete event after it has started",
      });
    }

    // Registered Students
    if (event.totalRegistrations > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete event with registered participants",
      });
    }

    await Event.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getPastEvents = async (req, res) => {
  try {
    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }
    const allEvents = await Event.find({
      organizer: society._id,
    });

    for (const event of allEvents) {
      await updateEventStatus(event);
    }
    const { search } = req.query;

    const filter = {
      organizer: society._id,
      status: "Completed",
    };

    // Search by Event Title
    if (search) {
      filter.title = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const events = await Event.find(filter)
      .sort({ date: -1 })
      .select(
        "banner title venue date totalRegistrations registrationMode likes certificateGenerated"
      );

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
const getPastEventDetails = async (req, res) => {
  try {

    const { id } = req.params;

    // Validate Event ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID",
      });
    }

    // Society Check
    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    // Find Completed Event
    const event = await Event.findOne({
      _id: id,
      organizer: society._id,
      status: "Completed",
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Past event not found",
      });
    }

    // =========================
    // Registrations
    // =========================

    const registrations = await EventRegistration.find({
      event: event._id,
    });

    const registered = registrations.length;

    const attended = registrations.filter(
      (item) => item.status === "Attended"
    ).length;

    const absent = registered - attended;

    // =========================
    // Feedback
    // =========================

    const feedbacks = await Feedback.find({
      event: event._id,
    })
      .populate(
        "student",
        "fullName rollNumber"
      )
      .sort({
        createdAt: -1,
      });

    const feedbackCount = feedbacks.length;

    let averageRating = 0;

    if (feedbackCount > 0) {

      const totalRating = feedbacks.reduce(
        (sum, item) => sum + item.rating,
        0
      );

      averageRating =
        totalRating / feedbackCount;

    }

    const recentFeedback = feedbacks.map(
      (item) => ({
        student:
          item.student?.fullName ||
          "Unknown Student",

        rollNumber:
          item.student?.rollNumber,

        rating: item.rating,

        comment: item.comment,

        createdAt: item.createdAt,
      })
    );

    return res.status(200).json({
      success: true,

      event,

      counts: {
        registered,
        attended,
        absent,
      },

      averageRating,

      feedbackCount,

      recentFeedback,


    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const getEventParticipants = async (req, res) => {
  try {

    const { id } = req.params;
    const { search, attendance } = req.query;

    // Validate Event ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID",
      });
    }

    // Check Society
    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    // Check Event
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

    // Participants
    const participants = await EventRegistration.find({
      event: event._id,
    })
      .populate({
        path: "student",
        select:
          "fullName email rollNumber branch year profilePicture",
      })
      .populate({
        path: "event",
        select: "date startTime endTime",
      })
      .sort({ createdAt: -1 });


    let filteredParticipants = participants;

    // Search Filter
    if (search) {

      const keyword = search.trim().toLowerCase();

      filteredParticipants =
        filteredParticipants.filter((participant) => {

          return (
            participant.student?.fullName
              ?.toLowerCase()
              .includes(keyword) ||

            participant.student?.rollNumber
              ?.toLowerCase()
              .includes(keyword)

          );

        });

    }

    // Attendance Filter
    if (attendance === "Attended") {

      filteredParticipants =
        filteredParticipants.filter(
          (participant) =>
            participant.status === "Attended"
        );

    }

    if (attendance === "Registered") {

      filteredParticipants =
        filteredParticipants.filter(
          (participant) =>
            participant.status === "Registered"
        );

    }

    // Counts (Always from complete list)
    const registered = participants.length;

    const attended =
      participants.filter(
        (participant) =>
          participant.status === "Attended"
      ).length;

    const absent =
      registered - attended;

    return res.status(200).json({

      success: true,

      event: {
        _id: event._id,
        title: event.title,
        registrationMode:
          event.registrationMode,
      },

      participants:
        filteredParticipants,

      counts: {
        registered,
        attended,
        absent,
      },

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,
      message:
        "Internal Server Error",

    });

  }
};
const markAttendance = async (req, res) => {
  try {

    const { eventId, registrationId } = req.params;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(eventId) ||
      !mongoose.Types.ObjectId.isValid(registrationId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    // Society Check
    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    // Event Check
    const event = await Event.findOne({
      _id: eventId,
      organizer: society._id,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    // Attendance allowed only after event starts
    const now = new Date();

    const eventStart = new Date(event.date);

    const [startHour, startMinute] =
      event.startTime.split(":");

    eventStart.setHours(Number(startHour));
    eventStart.setMinutes(Number(startMinute));
    eventStart.setSeconds(0);
    eventStart.setMilliseconds(0);

    // Event End Time
    const eventEnd = new Date(event.date);

    const [endHour, endMinute] =
      event.endTime.split(":");

    eventEnd.setHours(Number(endHour));
    eventEnd.setMinutes(Number(endMinute));
    eventEnd.setSeconds(0);
    eventEnd.setMilliseconds(0);

    if (now < eventStart) {

      return res.status(400).json({
        success: false,
        message:
          "Attendance can only be marked after the event starts.",
      });

    }

    if (now > eventEnd) {

      return res.status(400).json({
        success: false,
        message:
          "Attendance can only be marked before the event ends.",
      });

    }
    // Registration Check
    const registration =
      await EventRegistration.findOne({
        _id: registrationId,
        event: eventId,
      });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Participant not found",
      });
    }

    registration.status =
      registration.status === "Attended"
        ? "Registered"
        : "Attended";

    await registration.save();

    return res.status(200).json({
      success: true,
      message:
        registration.status === "Attended"
          ? "Attendance marked"
          : "Attendance removed",
      status: registration.status,
    });


  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
const exportParticipantsCSV = async (req, res) => {
  try {

    const { id } = req.params;
    const { attendance } = req.query;

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

    const participants =
      await EventRegistration.find({
        event: event._id,
      }).populate({
        path: "student",
        select:
          "fullName rollNumber branch year email",
      });

    let filteredParticipants =
      participants;

    // Attendance Filter
    if (attendance === "Attended") {

      filteredParticipants =
        filteredParticipants.filter(
          (participant) =>
            participant.status === "Attended"
        );

    }

    if (attendance === "Registered") {

      filteredParticipants =
        filteredParticipants.filter(
          (participant) =>
            participant.status === "Registered"
        );

    }

    const data =
      filteredParticipants.map(
        (item, index) => ({

          "S. No.": index + 1,

          Name:
            item.student?.fullName,

          "Roll Number":
            item.student?.rollNumber,

          Branch:
            item.student?.branch,

          Year:
            item.student?.year,

          Email:
            item.student?.email,

          Attendance:
            item.status,

        })
      );

    const parser =
      new Parser();

    const csv =
      parser.parse(data);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment(
      `${event.title}-Participants.csv`
    );

    return res.send(csv);

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,
      message:
        "Internal Server Error",

    });

  }
};
const generateCertificates = async (req, res) => {
  try {

    const { id } = req.params;

    // Validate Event ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID",
      });
    }

    // Society Check
    const society = await Society.findById(req.user.id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    // Event Check
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

    // Fetch Only Attended Students
    const registrations =
      await EventRegistration.find({
        event: event._id,
        status: "Attended",
      }).populate({
        path: "student",
        select: "fullName email",
      });

    if (registrations.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No attended participants found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Participants fetched successfully",
      total: registrations.length,
      registrations,
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

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const alreadyLiked =
      society.likedEvents.includes(event._id);

    if (alreadyLiked) {

      society.likedEvents.pull(event._id);

      if (event.likes > 0) {
        event.likes--;
      }

    } else {

      society.likedEvents.push(event._id);

      event.likes++;

    }

    await society.save();
    await event.save();

    return res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      likes: event.likes,
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
  createEvent,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getPastEvents,
  getPastEventDetails,
  getEventParticipants,
  markAttendance,
  exportParticipantsCSV,
  generateCertificates,
  toggleLikeEvent
};