const express = require("express");

const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const role = require("../middlewares/roleMiddleware");

const {
  signupStudent,
  verifyOTP,
  resendOTP,
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
  removeProfilePicture,
  leaveSociety,
  downloadCertificate
} = require("../controllers/studentController");

router.post("/signup", signupStudent);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", loginStudent);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", auth, getStudentProfile);
router.put("/profile", auth, updateStudentProfile);
router.put(
  "/profile-picture",
  auth,
  upload.single("profilePicture"),
  uploadProfilePicture
);
router.post(
  "/join-society/:societyId",
  auth,
  role("student"),
  joinSociety
);
router.get(
    "/societies",
    auth,
    role("student"),
    getAllSocieties
);
router.get(
  "/society/:id",
  auth,
  role("student"),
  getSocietyDetails
);
router.get(
  "/my-societies",
  auth,
  role("student"),
  getMySocieties
);

router.patch(
  "/society/:societyId/leave",
  auth,
  role("student"),
  leaveSociety
);

router.get(
  "/events",
  auth,
  role("student"),
  getAllEvents
);
router.get(
  "/event/:id",
  auth,
  role("student"),
  getEventDetails
);
router.post(
  "/event/:id/register",
  auth,
  role("student"),
  registerEvent
);
router.post(
  "/events/:id/feedback",
  auth,
  role("student"),
  submitFeedback
);
router.get(
    "/my-events",
    auth,
    role("student"),
    getMyEvents
);
router.post(
  "/event/:id/like",
  auth,
  role("student"),
  toggleLikeEvent
);
router.get(
  "/liked-events",
  auth,
  role("student"),
  getLikedEvents
);
router.put(
  "/change-password",
  auth,
  role("student"),
  changePassword
);
router.get(
  "/notifications",
  auth,
  role("student"),
  getNotifications
);

router.patch(
  "/notification/:id/read",
  auth,
  role("student"),
  markNotificationAsRead
);

router.delete(
  "/notification/:id",
  auth,
  role("student"),
  deleteNotification
);

router.delete(
  "/remove-profile-picture",
  auth,
  role("student"),
  removeProfilePicture
);

router.get(
  "/event/:id/certificate",
  auth,
  role("student"),
  downloadCertificate
);


module.exports = router;