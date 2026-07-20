import { useState } from "react";
import toast from "react-hot-toast";
import { X, Megaphone } from "lucide-react";

import { sendAnnouncement } from "../../../../services/joinRequestServices";

function AnnouncementModal({
  open,
  setOpen,
}) {
  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  const handleSend = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!message.trim()) {
      toast.error("Message is required");
      return;
    }

    try {
      setLoading(true);

      const response =
        await sendAnnouncement({
          title,
          message,
        });

      toast.success(response.message);

      setTitle("");
      setMessage("");
      setOpen(false);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to send announcement"
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
        z-[80]
        bg-black/60
        backdrop-blur-sm
        flex
        justify-center
        items-center
        p-4
        sm:p-5
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          bg-white
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* Header */}

        <div className="border-b p-5 sm:px-8 sm:py-6">

          <div className="flex items-start justify-between gap-4">

            <div className="min-w-0">

              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 break-words">
                Send Announcement
              </h2>

              <p className="mt-1 text-sm sm:text-base text-gray-500 break-words">
                This announcement will be sent to all society members.
              </p>

            </div>

            <button
              onClick={() =>
                setOpen(false)
              }
              className="shrink-0 p-2 rounded-xl hover:bg-slate-100 transition"
            >
              <X size={24} />
            </button>

          </div>

        </div>

        {/* Body */}

        <div className="p-5 sm:p-8 space-y-6">

          <div>

            <label className="font-semibold text-sm sm:text-base">
              Announcement Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Enter announcement title..."
              className="
                mt-2
                w-full
                border
                rounded-xl
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:ring-2
                focus:ring-slate-300
              "
            />

          </div>

          <div>

            <label className="font-semibold text-sm sm:text-base">
              Message
            </label>

            <textarea
              rows={6}
              value={message}
              maxLength={1000}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Write announcement..."
              className="
                mt-2
                w-full
                border
                rounded-xl
                px-4
                py-3
                text-sm
                sm:text-base
                resize-none
                outline-none
                focus:ring-2
                focus:ring-slate-300
              "
            />

            <div className="mt-2 text-right text-xs sm:text-sm text-gray-400">
              {message.length}/1000
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t p-5 sm:px-8 sm:py-6 flex flex-col-reverse sm:flex-row justify-end gap-3">

          <button
            onClick={() =>
              setOpen(false)
            }
            className="
              w-full
              sm:w-auto
              px-6
              py-3
              border
              rounded-xl
              hover:bg-slate-100
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSend}
            disabled={loading}
            className="
              w-full
              sm:w-auto
              px-6
              py-3
              bg-slate-900
              hover:bg-black
              text-white
              rounded-xl
              flex
              justify-center
              items-center
              gap-2
              disabled:opacity-60
              transition
            "
          >

            <Megaphone size={18} />

            {loading
              ? "Sending..."
              : "Send Announcement"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default AnnouncementModal;