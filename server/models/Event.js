const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    // Event Banner
    banner: {
      type: String,
      default: "",
    },

    // Event Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Event Description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Event Category
    category: {
      type: String,
      required: true,
      enum: [
        "Technical",
        "Workshop",
        "Hackathon",
        "Seminar",
        "Sports",
        "Cultural",
        "Placement",
        "Competition",
        "Other",
      ],
    },

    // Venue
    venue: {
      type: String,
      required: true,
      trim: true,
    },

    // Event Date
    date: {
      type: Date,
      required: true,
    },

    // Event Timing
    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    // Registration Deadline
    registrationDeadline: {
      type: Date,
      required: true,
    },

    // Registration Mode
    registrationMode: {
      type: String,
      required: true,
      enum: ["Participant", "Viewer"],
    },

    // Maximum Participants (only for Participant events)
    maximumParticipants: {
      type: Number,
      default: null,
    },

    // Event Organizer
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society",
      required: true,
    },

    // Event Status
    status: {
      type: String,
      enum: [
        "Upcoming",
        "Ongoing",
        "Completed",
        "Cancelled",
      ],
      default: "Upcoming",
    },

    // Registration Open / Closed
    isRegistrationOpen: {
      type: Boolean,
      default: true,
    },

    // Total Registrations
    totalRegistrations: {
      type: Number,
      default: 0,
    },

    // Total Likes
    likes: {
      type: Number,
      default: 0,
    },

    // Reminder Mail Sent
    reminderSent: {
      type: Boolean,
      default: false,
    },
    
    certificateGenerated: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);