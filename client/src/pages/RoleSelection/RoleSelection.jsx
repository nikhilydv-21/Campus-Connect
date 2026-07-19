import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 sm:px-6 py-8">

      <div className="w-full max-w-5xl">

        {/* Back Button */}

        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft
            size={16}
            className="shrink-0"
          />

          Back

        </button>

        {/* Heading */}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 text-center">
          Campus Connect
        </h1>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:mt-12">

          {/* Student */}

          <div
            className="
              bg-white
              rounded-2xl md:rounded-3xl
              p-6 sm:p-8 md:p-10
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
              hover:shadow-blue-200
            "
          >

            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900">
              Student
            </h2>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">

              <Button
                className="w-full sm:w-auto sm:min-w-[140px]"
                onClick={() => navigate("/login/student")}
              >
                Login
              </Button>

              <Button
                className="w-full sm:w-auto sm:min-w-[140px]"
                variant="outline"
                onClick={() => navigate("/register/student")}
              >
                Sign Up
              </Button>

            </div>

          </div>

          {/* Society */}

          <div
            className="
              bg-white
              rounded-2xl md:rounded-3xl
              p-6 sm:p-8 md:p-10
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
              hover:shadow-violet-200
            "
          >

            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900">
              Society
            </h2>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">

              <Button
                className="w-full sm:w-auto sm:min-w-[140px]"
                onClick={() => navigate("/login/society")}
              >
                Login
              </Button>

              <Button
                className="w-full sm:w-auto sm:min-w-[140px]"
                variant="outline"
                onClick={() => navigate("/register/society")}
              >
                Sign Up
              </Button>

            </div>

          </div>

        </div>

        {/* Admin Login */}

        <div className="flex justify-center mt-8 md:mt-10">

          <button
            onClick={() => navigate("/login/admin")}
            className="
              flex
              items-center
              gap-2
              text-slate-700
              font-semibold
              hover:text-black
              transition-all
              duration-300
              hover:scale-105
            "
          >

            <ShieldCheck
              size={18}
              className="shrink-0"
            />

            Admin Login

          </button>

        </div>

      </div>

    </div>
  );
}

export default RoleSelection;