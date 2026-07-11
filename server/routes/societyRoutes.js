const express = require("express");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();
const role = require("../middlewares/roleMiddleware"); 
const upload = require("../middlewares/uploadMiddleware");

const {
  getAnalytics,
} = require("../controllers/analyticsController");
const {
  signupSociety,
  loginSociety,
  forgotPassword,
  resetPassword,
  getSocietyProfile,
  getJoinRequests,
  acceptJoinRequest,
  rejectJoinRequest,
  updateSocietyProfile,
  uploadSocietyLogo,
  removeSocietyLogo,
  getMembers,
  removeMember,
  sendAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
  getAllFeedback,
  getEventFeedback,
  changePassword,
  generateCertificates
  
} = require("../controllers/societyController");

router.post("/signup", signupSociety);
router.post("/login", loginSociety);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", auth,getSocietyProfile);
router.get(
  "/join-requests",
  auth,
  role("society"),
  getJoinRequests
);
router.patch(
  "/join-request/:id/accept",
  auth,
  role("society"),
  acceptJoinRequest
);
router.patch(
  "/join-request/:id/reject",
  auth,
  role("society"),
  rejectJoinRequest
);
router.put("/profile", auth, updateSocietyProfile);
router.put(
  "/logo",
  auth,
  upload.single("logo"),
  uploadSocietyLogo
);

router.delete(
  "/logo",
  auth,
  role("society"),
  removeSocietyLogo
);

router.get(
  "/members",
  auth,
  role("society"),
  getMembers
);
router.patch(
  "/member/:id/remove",
  auth,
  role("society"),
  removeMember
);
router.post(
    "/announcement",
    auth,
    role("society"),
    sendAnnouncement
);
router.get(
    "/announcements",
    auth,
    role("society"),
    getAnnouncements
);
router.delete(
    "/announcement/:id",
    auth,
    role("society"),
    deleteAnnouncement
);

router.get(
  "/feedback",
  auth,
  role("society"),
  getAllFeedback
);

router.get(
  "/event/:id/feedback",
  auth,
  role("society"),
  getEventFeedback
);

router.put(
  "/change-password",
  auth,
  role("society"),
  changePassword
);



router.get(
  "/analytics",
  auth,
  role("society"),
  getAnalytics
);

router.post(
  "/event/:id/generate-certificates",
  auth,
  role("society"),
  generateCertificates
);

module.exports = router;