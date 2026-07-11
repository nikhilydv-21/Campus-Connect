const express = require("express");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const router = express.Router();

const {
  loginAdmin,
  getPendingSocieties,
  approveSociety,
  getAdminDashboard,
  rejectSociety,
  getAllSocieties,
  getSocietyDetails,
  getAllStudents,
  getStudentDetails,
  getAllEvents,
  getEventDetails,
  getAnalytics,
  deleteSociety,
  disableSociety
} = require("../controllers/adminController");

router.post("/login", loginAdmin);
router.get(
  "/pending-societies",
  auth,
  role("admin"),
  getPendingSocieties
);
router.put(
  "/approve-society/:id",
  auth,
  role("admin"),
  approveSociety
);
router.get(
  "/dashboard",
  auth,
  role("admin"),
  getAdminDashboard
);
router.patch(
  "/reject-society/:id",
  auth,
  role("admin"),
  rejectSociety
);
router.get(
  "/societies",
  auth,
  role("admin"),
  getAllSocieties
);

router.get(
  "/society/:id",
  auth,
  role("admin"),
  getSocietyDetails
);
router.get(
  "/students",
  auth,
  role("admin"),
  getAllStudents
);

router.get(
  "/student/:id",
  auth,
  role("admin"),
  getStudentDetails
);
router.get(
  "/events",
  auth,
  role("admin"),
  getAllEvents
);

router.get(
  "/event/:id",
  auth,
  role("admin"),
  getEventDetails
);
router.get(
  "/analytics",
  auth,
  role("admin"),
  getAnalytics
);
router.delete(
  "/society/:id",
  auth,
  role("admin"),
  deleteSociety
);
router.patch(
  "/society/:id/disable",
  auth,
  role("admin"),
  disableSociety
);

module.exports = router;