import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import NotFound from "../pages/NotFound/NotFound";
import RoleSelection from "../pages/RoleSelection/RoleSelection";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import SocietyDashboard from "../pages/SocietyDashboard/SocietyDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import Feedback from "../pages/SocietyDashboard/Feedback/Feedback";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route
        path="/choose-role"
        element={<RoleSelection />}
        />

        <Route
       path="/login/:role"
       element={<Login />}
       />

        <Route
       path="/register/:role"
       element={<Register />}
       /> 
     
     <Route
    path="/verify-otp"
    element={<VerifyOTP />}
    />
        
    <Route
    path="/forgot-password/:role"
    element={<ForgotPassword />}
   /> 

    <Route
    path="/student/dashboard"
    element={<StudentDashboard />}
    />
    <Route
  path="/society/feedback/:id"
  element={<Feedback />}
/>

    <Route
    path="/society/dashboard"
    element={<SocietyDashboard />}
    />

    <Route
    path="/admin/dashboard"
    element={<AdminDashboard />}
    />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;