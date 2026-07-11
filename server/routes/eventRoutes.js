const express = require("express");

const router = express.Router()
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const {
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
} = require("../controllers/eventController");

// Create Event
router.post(
  "/create",
  auth,
  role("society"),
  upload.single("banner"),
  createEvent
);

// Get My Events
router.get(
  "/my-events",
  auth,
  role("society"),
  getMyEvents
);

// Past Events
router.get(
  "/past-events",
  auth,
  role("society"),
  getPastEvents
);

// Past Event Details
router.get(
  "/past-events/:id",
  auth,
  role("society"),
  getPastEventDetails
);

router.get(
  "/:id/participants/export",
  auth,
  role("society"),
  exportParticipantsCSV
);

router.get(
  "/:id/participants",
  auth,
  role("society"),
  getEventParticipants
);

router.patch(
  "/:eventId/attendance/:registrationId",
  auth,
  role("society"),
  markAttendance
);

router.post(
  "/:id/generate-certificates",
  auth,
  role("society"),
  generateCertificates
);

router.put(
  "/:id/like",
  auth,
  role("society"),
  toggleLikeEvent
);

// Update Event
router.put(
  "/:id",
  auth,
  role("society"),
  upload.single("banner"),
  updateEvent
);

// Get Event By ID
router.get(
  "/:id",
  auth,
  role("society"),
  getEventById
);




// Delete Event
router.delete(
  "/:id",
  auth,
  role("society"),
  deleteEvent
);
module.exports = router;