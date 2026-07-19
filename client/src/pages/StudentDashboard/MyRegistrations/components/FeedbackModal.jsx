import { useState } from "react";
import toast from "react-hot-toast";

import {
  X,
  Star,
  MessageSquare,
} from "lucide-react";

import {
  submitFeedback,
} from "../../../../services/studentServices";

function FeedbackModal({
  open,
  setOpen,
  registration,
  onSuccess,
}) {
  const [rating, setRating] =
    useState(0);

  const [hover, setHover] =
    useState(0);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!open || !registration)
    return null;

  const event = registration.event;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error(
        "Please select a rating"
      );
      return;
    }

    if (!comment.trim()) {
      toast.error(
        "Please write your feedback"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await submitFeedback(
          event._id,
          {
            rating,
            comment,
          }
        );

      toast.success(response.message);

      setOpen(false);
      setRating(0);
      setComment("");

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to submit feedback"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        justify-center
        items-center
        z-50
        px-4
        py-4
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-xl
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
          overflow-hidden
          max-h-[95vh]
          overflow-y-auto
        "
      >

        {/* Header */}

        <div
          className="
            flex
            justify-between
            items-start
            sm:items-center
            border-b
            p-5
            sm:p-6
            gap-4
          "
        >

          <div className="flex-1">

            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 break-words">
              Give Feedback
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Share your experience about this event.
            </p>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="
              p-2
              rounded-full
              hover:bg-slate-100
              transition
              shrink-0
            "
          >

            <X size={22} />

          </button>

        </div>

        {/* Body */}

        <div className="p-5 sm:p-6">

          <h3 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
            {event.title}
          </h3>

          {/* Rating */}

          <div className="mt-8">

            <p className="font-semibold text-slate-700 mb-4">
              Your Rating
            </p>

            <div className="flex justify-center sm:justify-start gap-2 flex-wrap">

              {[1, 2, 3, 4, 5].map((star) => (

                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() =>
                    setHover(star)
                  }
                  onMouseLeave={() =>
                    setHover(0)
                  }
                  className="transition"
                >

                  <Star
                    size={30}
                    className={
                      (hover || rating) >= star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />

                </button>

              ))}

            </div>

          </div>

          {/* Comment */}

          <div className="mt-8">

            <label className="font-semibold text-slate-700 flex items-center gap-2 mb-3">

              <MessageSquare
                size={18}
                className="shrink-0"
              />

              Feedback

            </label>

            <textarea
              rows={5}
              value={comment}
              maxLength={50}
              onChange={(e) =>
                setComment(e.target.value)
              }
              placeholder="Write your feedback here..."
              className="
                w-full
                border
                rounded-2xl
                p-4
                text-sm
                sm:text-base
                outline-none
                resize-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <div className="text-right text-xs sm:text-sm text-gray-400 mt-2">

              {comment.length}/50

            </div>

          </div>

        </div>

        {/* Footer */}

        <div
          className="
            border-t
            p-5
            sm:p-6
            flex
            flex-col-reverse
            sm:flex-row
            justify-end
            gap-3
          "
        >

          <button
            onClick={() => setOpen(false)}
            className="
              w-full
              sm:w-auto
              px-6
              py-3
              rounded-xl
              border
              hover:bg-slate-100
              transition
            "
          >

            Cancel

          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full
              sm:w-auto
              px-8
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              transition
              disabled:opacity-60
            "
          >

            {loading
              ? "Submitting..."
              : "Submit Feedback"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default FeedbackModal;