import { deleteEvent } from "../../../../services/eventServices";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

function DeleteModal({
  open,
  setOpen,
  event,
  refreshEvents,
}) {
  if (!open || !event) return null;

  const handleDelete = async () => {
    try {
      const response = await deleteEvent(event._id);

      toast.success(response.message);

      setOpen(false);

      refreshEvents();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete event"
      );
    }
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          rounded-3xl
          p-8
          max-w-md
          w-full
          shadow-xl
        "
      >
        <div className="flex justify-center">

          <div
            className="
              w-16
              h-16
              rounded-full
              bg-red-100
              flex
              items-center
              justify-center
            "
          >
            <Trash2
              size={32}
              className="text-red-600"
            />
          </div>

        </div>

        <h2 className="text-2xl font-bold text-center mt-6">
          Delete Event
        </h2>

        <p className="text-gray-500 text-center mt-3 leading-7">
          Are you sure you want to delete
          <br />

          <span className="font-semibold text-slate-800">
            {event.title}
          </span>

          ?
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="
              border
              rounded-xl
              py-3
              hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              rounded-xl
              py-3
            "
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}

export default DeleteModal;