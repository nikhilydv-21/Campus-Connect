const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },
    purpose: {
    type: String,
    enum: ["verification", "forgot-password"],
    required: true,
},
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OTP", otpSchema);