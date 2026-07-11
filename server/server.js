const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const societyRoutes = require("./routes/societyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");


dotenv.config();

const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/student", studentRoutes);
app.use("/api/society", societyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/event", eventRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Campus Connect Backend is Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on Port ${PORT}`);
});