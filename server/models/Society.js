const mongoose = require("mongoose");

const societySchema = new mongoose.Schema(
  {
    // Signup Details
    societyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },


    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    facultyCoordinator: {
      type: String,
      default: "",
      trim: true,
    },

    societyType: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    // Society Profile
    logo: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    vision: {
      type: String,
      default: "",
      trim: true,
    },

    mission: {
      type: String,
      default: "",
      trim: true,
    },

    // Society Team
    secretaries: [
      {
        name: {
          type: String,
          trim: true,
        },
      },
    ],

    jointSecretaries: [
      {
        name: {
          type: String,
          trim: true,
        },
      },
    ],

    // Achievements
    achievements: [
      {
        title: {
          type: String,
          default: "",
          trim: true,
        },

        description: {
          type: String,
          default: "",
          trim: true,
        },
      },
    ],
    // Contacts
    contacts: [
      {
        name: {
          type: String,
          trim: true,
        },

        position: {
          type: String,
          trim: true,
        },

        phone: {
          type: String,
          trim: true,
        },
      },
    ],
    // Social Links
    socialLinks: {
      instagram: {
        type: String,
        default: "",
        trim: true,
      },

      linkedin: {
        type: String,
        default: "",
        trim: true,
      },

      website: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // Analytics
    totalMembers: {
      type: Number,
      default: 0,
    },
    likedEvents: [

      {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Event",

      },

    ],
    // Authentication
    isApproved: {
      type: Boolean,
      default: false,
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["society"],
      default: "society",
    },


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Society", societySchema);