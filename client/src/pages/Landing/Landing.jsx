import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 py-8">

      <div className="w-full max-w-3xl text-center">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Campus Connect
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-slate-600 font-medium">
          Connect • Learn • Grow
        </p>

        <p className="mt-6 text-base sm:text-lg text-slate-500 leading-7 sm:leading-8 px-2 sm:px-0">
          One platform to connect students, societies and college events
          seamlessly.
        </p>

        <div className="mt-10 flex justify-center">
          <Button
            fullWidth
            className="w-full sm:w-auto max-w-xs"
            onClick={() => navigate("/choose-role")}
          >
            Get Started
          </Button>
        </div>

      </div>

    </div>
  );
}

export default Landing;