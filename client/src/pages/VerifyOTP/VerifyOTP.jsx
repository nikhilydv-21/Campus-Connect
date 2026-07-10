import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Button from "../../components/common/Button/Button";
import toast from "react-hot-toast";
import {
  verifyOTP,
  resendOTP,
} from "../../services/authServices";
function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOTPChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOTP = [...otp];
    updatedOTP[index] = value;
    setOtp(updatedOTP);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updatedOTP = [...otp];
        updatedOTP[index] = "";
        setOtp(updatedOTP);
      } else if (index > 0) {
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .trim();

    if (!/^\d{6}$/.test(pastedData)) return;

    setOtp(pastedData.split(""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOTP = otp.join("");

    if (finalOTP.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyOTP({
        email,
        otp: finalOTP,
      });

      toast.success(response.message);

      navigate("/login/student");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Verification Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-4xl font-bold text-center text-slate-900">
            Verify OTP
          </h1>

          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-3 mb-6"></div>

          <p className="text-center text-gray-500 mb-8">
            Enter the verification code sent to
            <br />
            <span className="font-semibold text-blue-600">
              {email}
            </span>
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            <div>

              <label className="block mb-3 text-sm font-medium text-gray-700">
                OTP
              </label>

              <div
                className="flex justify-between gap-2"
                onPaste={handlePaste}
              >

                {otp.map((digit, index) => (

                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOTPChange(index, e.target.value)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, e)
                    }
                    className="w-12 h-14 rounded-xl border-2 border-gray-300 text-center text-xl font-bold outline-none focus:border-blue-600 transition"
                  />

                ))}

              </div>

            </div>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

          </form>



          <p className="text-center text-sm text-gray-500 mt-8">
            {timer > 0 ? (
              <>
                Resend OTP in{" "}
                <span className="font-semibold text-blue-600">
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </span>
              </>
            ) : (
              <button
                type="button"
                onClick={async () => {
                  try {
                    const response = await resendOTP(email);

                    toast.success(response.message);
                    setOtp(["", "", "", "", "", ""]);
                    document.getElementById("otp-0")?.focus();

                    setTimer(120);

                  } catch (error) {
                    toast.error(
                      error.response?.data?.message ||
                      "Failed to resend OTP"
                    );
                  }
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Resend OTP
              </button>
            )}
          </p>

        </div>

      </div>

    </div>
  );
}

export default VerifyOTP;