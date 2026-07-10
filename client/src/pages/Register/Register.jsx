import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import studentFields from "../../data/studentFields";
import societyFields from "../../data/societyFields";

import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

import {
  studentSignup,
  societySignup,
} from "../../services/authServices";

function Register() {
  const { role } = useParams();
  const navigate = useNavigate();

  const fields =
    role === "student"
      ? studentFields
      : societyFields;

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=-])[A-Za-z\d@$!%*?&#^()_+=-]{8,}$/;

  const passwordChecks = {
    length: formData.password?.length >= 8,
    uppercase: /[A-Z]/.test(formData.password || ""),
    lowercase: /[a-z]/.test(formData.password || ""),
    number: /\d/.test(formData.password || ""),
    special: /[@$!%*?&#^()_+=-]/.test(
      formData.password || ""
    ),
  };
  const handleChange = (e) => {

    let { name, value } = e.target;

    if (name === "rollNumber") {
      value = value.replace(/\D/g, "").slice(0, 11);
    }

    if (name === "contactNumber") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({
      ...formData,
      [name]: value,
    });

  };




const handleSubmit = async (e) => {
  e.preventDefault();

  for (const field of fields) {
    if (!formData[field.name]) {
      toast.error(`${field.label} is required`);
      return;
    }
  }



  if (
    role === "student" &&
    !/^\d{11}$/.test(formData.rollNumber)
  ) {
    toast.error("Invalid roll number");
    return;
  }

  if (
    !/^\d{10}$/.test(formData.contactNumber)
  ) {
    toast.error("Invalid contact number");
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }


  if (!passwordRegex.test(formData.password)) {
    toast.error(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
    );
    return;
  }
  let loadingToast;
  try {
    setLoading(true);
    loadingToast = toast.loading("Creating account...");

    let response;

    if (role === "student") {
      response = await studentSignup(formData);

      toast.success(response.message);

      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });

    } else {

      response = await societySignup(formData);

      toast.success(response.message);

      navigate("/login/society");
    }

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );

  } finally {
    if (loadingToast) {
      toast.dismiss(loadingToast);
    }
    setLoading(false);
  }
};

return (
  <div className="min-h-screen bg-white flex items-center justify-center px-6 py-10">

    <div className="w-full max-w-lg">

      <button
        onClick={() => navigate("/choose-role")}
        className="mb-5 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">

        <h1 className="text-4xl font-extrabold text-center text-slate-900">
          {role === "student"
            ? "Student Registration"
            : "Society Registration"}
        </h1>

        <p className="text-center text-gray-500 mt-3">
          {role === "student"
            ? "Create your account to continue."
            : "Your account will be activated after admin approval."}
        </p>

        <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-3 mb-8"></div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {fields.map((field) => (
            <div key={field.name}>

              <label className="block mb-2 text-sm font-medium text-gray-600">
                {field.label}
              </label>

              {field.name === "password" ? (

                <>
                  <div className="relative">

                    <Input
                      name={field.name}
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
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

                  {formData.password && (
                    <div className="mt-3 space-y-1 text-sm">

                      <p className={passwordChecks.length ? "text-green-600" : "text-red-500"}>
                        {passwordChecks.length ? "✅" : "❌"} Minimum 8 characters
                      </p>

                      <p className={passwordChecks.uppercase ? "text-green-600" : "text-red-500"}>
                        {passwordChecks.uppercase ? "✅" : "❌"} One uppercase letter
                      </p>

                      <p className={passwordChecks.lowercase ? "text-green-600" : "text-red-500"}>
                        {passwordChecks.lowercase ? "✅" : "❌"} One lowercase letter
                      </p>

                      <p className={passwordChecks.number ? "text-green-600" : "text-red-500"}>
                        {passwordChecks.number ? "✅" : "❌"} One number
                      </p>

                      <p className={passwordChecks.special ? "text-green-600" : "text-red-500"}>
                        {passwordChecks.special ? "✅" : "❌"} One special character
                      </p>

                    </div>
                  )}

                </>

              ) : field.name === "confirmPassword" ? (
                <div className="relative">

                  <Input
                    name={field.name}
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder={field.placeholder}
                    value={
                      formData[field.name] || ""
                    }
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  >
                    {showConfirmPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>

                </div>


              ) : (

                <Input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  options={field.options}
                  value={
                    formData[field.name] || ""
                  }
                  onChange={handleChange}
                  maxLength={
                    field.name === "rollNumber"
                      ? 11
                      : field.name === "contactNumber"
                        ? 10
                        : undefined
                  }
                  inputMode={
                    field.name === "rollNumber" ||
                      field.name === "contactNumber"
                      ? "numeric"
                      : undefined
                  }
                  pattern={
                    field.name === "rollNumber" ||
                      field.name === "contactNumber"
                      ? "[0-9]*"
                      : undefined
                  }
                />

              )}

            </div>
          ))}

          <Button
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : role === "student"
                ? "Create Account"
                : "Send Request for Admin Approval"}
          </Button>

        </form>

        <div className="border-t border-gray-200 my-6"></div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to={`/login/${role}`}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  </div>
);
}

export default Register;