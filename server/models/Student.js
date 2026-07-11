const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },

    branch: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    interests: {
      type: [String],
      default: [],
    },

    joinedSocieties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society",
      },
    ],

    likedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["student"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);