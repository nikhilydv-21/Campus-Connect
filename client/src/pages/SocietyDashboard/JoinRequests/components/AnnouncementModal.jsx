import { useState } from "react";
import toast from "react-hot-toast";
import { X, Megaphone } from "lucide-react";

import { sendAnnouncement } from "../../../../services/joinRequestServices";

function AnnouncementModal({
  open,
  setOpen,
}) {

  const [title, setTitle] = useState("");

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
        bg-black/60
        backdrop-blur-sm
        flex
        justify-center
        items-center
        z-[80]
        p-5
      "
    >

      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-2xl
          overflow-hidden
          shadow-2xl
        "
      >

        {/* Header */}

        <div className="border-b px-8 py-6 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              Send Announcement

            </h2>

            <p className="text-gray-500 mt-1">

              This announcement will be sent to all society members.

            </p>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-xl hover:bg-slate-100"
          >

            <X size={24} />

          </button>

        </div>

        {/* Body */}

        <div className="p-8 space-y-6">

          <div>

            <label className="font-semibold">

              Announcement Title

            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter announcement title..."
              className="
                mt-2
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-slate-300
              "
            />

          </div>

          <div>

            <label className="font-semibold">

              Message

            </label>

            <textarea
              rows={6}
              value={message}
              maxLength={1000}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Write announcement..."
              className="
                mt-2
                w-full
                border
                rounded-xl
                px-4
                py-3
                resize-none
                outline-none
                focus:ring-2
                focus:ring-slate-300
              "
            />

            <div className="text-right text-sm text-gray-400 mt-2">

              {message.length}/1000

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-8 py-6 flex justify-end gap-3">

          <button
            onClick={() => setOpen(false)}
            className="
              px-6
              py-3
              border
              rounded-xl
              hover:bg-slate-100
            "
          >

            Cancel

          </button>

          <button
            onClick={handleSend}
            disabled={loading}
            className="
              px-6
              py-3
              bg-slate-900
              hover:bg-black
              text-white
              rounded-xl
              flex
              items-center
              gap-2
              disabled:opacity-60
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