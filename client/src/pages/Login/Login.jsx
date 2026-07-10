import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

import {
  studentLogin,
  societyLogin,
  adminLogin,
} from "../../services/authServices";

function Login() {
  const { role } = useParams();
  const navigate = useNavigate();

  const heading =
    role.charAt(0).toUpperCase() +
    role.slice(1) +
    " Login";

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    (role === "student" || role === "society") &&
    (!formData.email || !formData.password)
  ) {
    toast.error("Please fill all fields");
    return;
  }

  if (
    role === "admin" &&
    (!formData.username || !formData.password)
  ) {
    toast.error("Please fill all fields");
    return;
  }

  let loadingToast;

  try {
    setLoading(true);

    loadingToast = toast.loading("Logging in...");

    let response;

    if (role === "student") {

      response = await studentLogin({
        email: formData.email,
        password: formData.password,
      });

      localStorage.removeItem("society");

      localStorage.setItem("token", response.token);

      localStorage.setItem(
        "student",
        JSON.stringify(response.student)
      );

      toast.success(response.message);

      navigate("/student/dashboard");

    } else if (role === "society") {

      response = await societyLogin({
        email: formData.email,
        password: formData.password,
      });

      localStorage.removeItem("student");

      localStorage.setItem("token", response.token);

      localStorage.setItem(
        "society",
        JSON.stringify(response.society)
      );

      toast.success(response.message);

      navigate("/society/dashboard");

    } else if (role === "admin") {

      response = await adminLogin({
        username: formData.username,
        password: formData.password,
      });

      localStorage.removeItem("student");
      localStorage.removeItem("society");

      localStorage.setItem("token", response.token);

      toast.success(response.message);

      navigate("/admin/dashboard");
    }

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Login Failed"
    );

  } finally {

    if (loadingToast) {
      toast.dismiss(loadingToast);
    }

    setLoading(false);
  }
}; 

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">

      <div className="w-full max-w-lg">

        <button
          onClick={() =>
            navigate("/choose-role")
          }
          className="mb-5 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-4xl font-bold text-center text-slate-900">
            {heading}
          </h1>

          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-3 mb-8"></div>

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >

            <div>

             <label className="block mb-2 text-sm font-medium text-gray-600">
               {role === "admin"
               ? "Username"
               : "Email Address"}
              </label>

              <Input
               name={
               role === "admin"
              ? "username"
             : "email"
                }
             type="text"
              placeholder={
            role === "admin"
             ? "Enter username"
             : "Enter your email"
            }
           value={
           role === "admin"
            ? formData.username
           : formData.email
           }
          onChange={handleChange}
          />
            </div>

            <div>

              <label className="block mb-2 text-sm font-medium text-gray-600">
                Password
              </label>

              <div className="relative">

                <Input
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>

              </div>

            </div>

            {role !== "admin" && (
           <div className="flex justify-end">
           <Link
            to={`/forgot-password/${role}`}
           className="text-sm text-blue-600 hover:underline"
            >
           Forgot Password?
           </Link>
           </div>
          )}

            <Button
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>

            {role !== "admin" && (
           <div className="border-t border-gray-200 pt-6">

           <p className="text-center text-sm text-gray-500">

           Don't have an account?{" "}

         <Link
         to={`/register/${role}`}
        className="font-semibold text-blue-600 hover:underline"
       >
        Sign Up
      </Link>

    </p>

  </div>
)}

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;