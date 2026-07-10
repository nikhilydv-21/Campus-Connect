import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import toast from "react-hot-toast";
import { getEventFeedback } from "../../../services/authServices";

function Feedback() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await getEventFeedback(id);
      setFeedbacks(res.feedbacks);
    } catch (err) {
      toast.error("Unable to load feedback");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-blue-600"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-8">
        Event Feedback
      </h1>

      {feedbacks.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow">
          No Feedback Found
        </div>
      ) : (
        <div className="space-y-5">

          {feedbacks.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-2xl shadow p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold text-lg">
                    {item.student.fullName}
                  </h2>

                  <p className="text-gray-500">
                    {item.student.rollNumber}
                  </p>

                </div>

                <div className="flex items-center gap-1">

                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-500"
                  />

                  <span className="font-semibold">
                    {item.rating}/5
                  </span>

                </div>

              </div>

              <p className="mt-5 text-gray-700">
                {item.comment}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Feedback;