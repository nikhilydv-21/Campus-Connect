const mongoose = require("mongoose");

const joinRequestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    society: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society",
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Removed", "Left" ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate requests
joinRequestSchema.index(
  {
    student: 1,
    society: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "JoinRequest",
  joinRequestSchema
);