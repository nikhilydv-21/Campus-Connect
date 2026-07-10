import { X, Star, MessageSquare } from "lucide-react";

function FeedbackModal({
  open,
  setOpen,
  feedbacks,
}) {
  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">
              All Feedback
            </h2>

            <p className="text-gray-500 mt-1">
              {feedbacks.length} Responses
            </p>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-5">

          {feedbacks.length === 0 ? (

            <div className="text-center py-12">

              <MessageSquare
                className="mx-auto text-gray-400 mb-3"
                size={40}
              />

              <h3 className="font-semibold text-lg">
                No Feedback Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Participants haven't submitted feedback.
              </p>

            </div>

          ) : (

            feedbacks.map((item) => (

              <div
                key={item._id}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-semibold text-lg">

                    {item.student.fullName}

                  </h3>

                  <div className="flex items-center gap-1">

                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="font-semibold">

                      {item.rating}/5


                    </span>

                  </div>

                </div>

                <p className="text-gray-600 mt-4 leading-7">

                  {item.comment || "No comment"}

                </p>

              </div>

            ))

          )}

        </div>

      </div>
    </div>
  );
}

export default FeedbackModal;