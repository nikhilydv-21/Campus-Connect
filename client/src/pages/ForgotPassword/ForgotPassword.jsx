import { useState } from "react";

import {
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

import {
  studentForgotPassword,
  studentResetPassword,
  societyForgotPassword,
  societyResetPassword,
} from "../../services/authServices";

function ForgotPassword() {

  const navigate = useNavigate();

  const { role } = useParams();

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({

      email: "",

      otp: "",

      newPassword: "",

      confirmPassword: "",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // Send OTP

  const handleSendOTP = async () => {

    if (!formData.email) {

      return toast.error(
        "Email is required"
      );

    }

    try {

      setLoading(true);

      let response;

      if (role === "student") {

        response =
          await studentForgotPassword({
            email: formData.email,
          });

      } else {

        response =
          await societyForgotPassword({
            email: formData.email,
          });

      }

      toast.success(response.message);

      setStep(2);

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to send OTP"

      );

    } finally {

      setLoading(false);

    }

  };

  // Reset Password

  const handleResetPassword =
    async () => {

      if (

        !formData.otp ||

        !formData.newPassword ||

        !formData.confirmPassword

      ) {

        return toast.error(
          "Please fill all fields"
        );

      }

      try {

        setLoading(true);

        let response;

        const payload = {

          email: formData.email,

          otp: formData.otp,

          newPassword:
            formData.newPassword,

          confirmPassword:
            formData.confirmPassword,

        };

        if (role === "student") {

          response =
            await studentResetPassword(
              payload
            );

        } else {

          response =
            await societyResetPassword(
              payload
            );

        }

        toast.success(response.message);

        navigate(`/login/${role}`);

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Password reset failed"

        );

      } finally {

        setLoading(false);

      }

    };
      return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="w-full max-w-lg">

        <button
          onClick={() =>
            navigate(`/login/${role}`)
          }
          className="mb-5 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
        >

          <ArrowLeft size={18} />

          Back to Login

        </button>

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-4xl font-bold text-center text-slate-900">

            Forgot Password

          </h1>

          <p className="text-center text-gray-500 mt-2">

            {step === 1

              ? "Enter your registered email"

              : "Enter OTP and new password"}

          </p>

          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-4 mb-8"></div>

          <div className="space-y-6">

            {/* Email */}

            <div>

              <label className="block mb-2 text-sm font-medium text-gray-600">

                Email Address

              </label>

              <Input
                name="email"
                type="email"
                placeholder="Enter registered email"
                value={formData.email}
                onChange={handleChange}
                disabled={step === 2}
              />

            </div>

            {step === 2 && (

              <>

                {/* OTP */}

                <div>

                  <label className="block mb-2 text-sm font-medium text-gray-600">

                    OTP

                  </label>

                  <Input
                    name="otp"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleChange}
                  />

                </div>

                {/* Password */}

                <div>

                  <label className="block mb-2 text-sm font-medium text-gray-600">

                    New Password

                  </label>

                  <div className="relative">

                    <Input
                      name="newPassword"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >

                      {showPassword ? (

                        <Eye size={20} />

                      ) : (

                        <EyeOff size={20} />

                      )}

                    </button>

                  </div>

                </div>

                {/* Confirm Password */}

                <div>

                  <label className="block mb-2 text-sm font-medium text-gray-600">

                    Confirm Password

                  </label>

                  <div className="relative">

                    <Input
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >

                      {showConfirmPassword ? (

                        <Eye size={20} />

                      ) : (

                        <EyeOff size={20} />

                      )}

                    </button>

                  </div>

                </div>

              </>

            )}

            <Button
              fullWidth
              disabled={loading}
              onClick={
                step === 1
                  ? handleSendOTP
                  : handleResetPassword
              }
            >

              {loading

                ? "Please Wait..."

                : step === 1

                ? "Send OTP"

                : "Reset Password"}

            </Button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;