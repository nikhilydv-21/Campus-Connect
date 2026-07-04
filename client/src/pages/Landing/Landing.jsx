import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";
function Landing() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="text-center max-w-3xl">

        <h1 className="text-6xl font-extrabold text-slate-900">
          Campus Connect
        </h1>

        <p className="mt-5 text-xl text-slate-600">
          Connect • Learn • Grow
        </p>

        <p className="mt-6 text-lg text-slate-500 leading-8">
          One platform to connect students,
          societies and college events seamlessly.
        </p>

        <div className="mt-10">

          <Button onClick={() => navigate("/choose-role")}>
              Get Started
           </Button>

        </div>

      </div>

    </div>
  );
}

export default Landing;