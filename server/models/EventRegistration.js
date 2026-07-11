const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    status: {
      type: String,
      enum: ["Registered", "Attended"],
      default: "Registered",
    },

    certificateGenerated: {
      type: Boolean,
      default: false,
    },

    certificateUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);