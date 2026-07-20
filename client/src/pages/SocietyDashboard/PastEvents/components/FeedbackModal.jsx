import {
  X,
  Star,
  MessageSquare,
} from "lucide-react";

function FeedbackModal({
  open,
  setOpen,
  feedbacks,
}) {

  if (!open) return null;

  return (

    <div
      onClick={() => setOpen(false)}
      className="
        fixed
        inset-0
        z-[60]
        flex
        items-center
        justify-center
        bg-black/60
        p-4
      "
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          sm:rounded-3xl
          bg-white
          shadow-2xl
        "
      >

        {/* Header */}

        <div
          className="
            flex
            items-start
            justify-between
            border-b
            p-4
            sm:p-6
            gap-4
          "
        >

          <div className="min-w-0">

            <h2 className="text-xl sm:text-2xl font-bold break-words">

              All Feedback

            </h2>

            <p className="mt-1 text-sm sm:text-base text-gray-500">

              {feedbacks.length} Responses

            </p>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="
              shrink-0
              rounded-full
              p-2
              transition
              hover:bg-gray-100
            "
          >

            <X size={22} />

          </button>

        </div>

        {/* Body */}

        <div className="space-y-4 sm:space-y-5 p-4 sm:p-6">

          {feedbacks.length === 0 ? (

            <div className="py-10 sm:py-12 text-center">

              <MessageSquare
                size={40}
                className="mx-auto mb-3 text-gray-400"
              />

              <h3 className="text-base sm:text-lg font-semibold">

                No Feedback Yet

              </h3>

              <p className="mt-2 text-sm sm:text-base text-gray-500">

                Participants haven't submitted feedback.

              </p>

            </div>

          ) : (

            feedbacks.map((item) => (

              <div
                key={item._id}
                className="
                  rounded-2xl
                  border
                  p-4
                  sm:p-5
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-2
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  <h3 className="text-base sm:text-lg font-semibold break-words">

                    {item.student.fullName}

                  </h3>

                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      shrink-0
                    "
                  >

                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="font-semibold">

                      {item.rating}/5

                    </span>

                  </div>

                </div>

                <p
                  className="
                    mt-4
                    text-sm
                    sm:text-base
                    leading-6
                    sm:leading-7
                    text-gray-600
                    break-words
                  "
                >

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