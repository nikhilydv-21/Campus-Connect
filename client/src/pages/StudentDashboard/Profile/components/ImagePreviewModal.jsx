import { useEffect } from "react";
import { X } from "lucide-react";

function ImagePreviewModal({
  show,
  setShow,
  student,
}) {

  useEffect(() => {

    const handleKeyDown = (e) => {

      if (e.key === "Escape") {

        setShow(false);

      }

    };

    if (show) {

      document.body.style.overflow = "hidden";

      document.addEventListener(
        "keydown",
        handleKeyDown
      );

    }

    return () => {

      document.body.style.overflow = "auto";

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [show, setShow]);

  if (!show) return null;

  return (

    <div
      onClick={() => setShow(false)}
      className="
        fixed
        inset-0
        z-50
        bg-black/70
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-6
        animate-[fadeIn_.25s_ease]
      "
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          animate-[zoomIn_.25s_ease]
        "
      >

        {/* Close Button */}

        <button
          onClick={() => setShow(false)}
          className="
            absolute
            -top-5
            -right-5
            w-11
            h-11
            rounded-full
            bg-white
            shadow-xl
            flex
            items-center
            justify-center
            hover:scale-110
            hover:bg-slate-100
            transition-all
            duration-200
            z-20
          "
        >

          <X size={22} />

        </button>

        {/* Profile Picture */}

        <img
          src={
            student?.profilePicture ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              student?.fullName || "Student"
            )}`
          }
          alt="Profile Picture"
          className="
            max-w-[80vw]
            max-h-[80vh]
            object-contain
            rounded-3xl
            bg-white
            p-3
            shadow-2xl
            transition-transform
            duration-300
            hover:scale-[1.02]
            select-none
          "
          draggable={false}
        />

      </div>

      <style>{`

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

      `}</style>

    </div>

  );

}

export default ImagePreviewModal;