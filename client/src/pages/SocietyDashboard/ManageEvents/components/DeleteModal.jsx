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
      const response =
        await deleteEvent(event._id);

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
      onClick={() =>
        setOpen(false)
      }
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
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          sm:rounded-3xl
          shadow-xl
          p-5
          sm:p-8
        "
      >

        <div className="flex justify-center">

          <div
            className="
              w-14
              h-14
              sm:w-16
              sm:h-16
              rounded-full
              bg-red-100
              flex
              items-center
              justify-center
            "
          >

            <Trash2
              size={28}
              className="text-red-600 sm:w-8 sm:h-8"
            />

          </div>

        </div>

        <h2 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-bold text-center text-slate-800">
          Delete Event
        </h2>

        <p className="mt-3 text-sm sm:text-base text-center text-gray-500 leading-6 sm:leading-7 break-words">

          Are you sure you want to delete

          <br />

          <span className="font-semibold text-slate-800 break-words">
            {event.title}
          </span>

          ?

        </p>

        <div className="mt-8 flex flex-col-reverse sm:grid sm:grid-cols-2 gap-3 sm:gap-4">

          <button
            onClick={() =>
              setOpen(false)
            }
            className="
              w-full
              border
              rounded-xl
              py-3
              hover:bg-gray-100
              transition
            "
          >

            Cancel

          </button>

          <button
            onClick={handleDelete}
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              text-white
              rounded-xl
              py-3
              transition
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