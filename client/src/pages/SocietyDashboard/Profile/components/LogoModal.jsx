import { useEffect } from "react";
import { X } from "lucide-react";

function LogoModal({
  showLogo,
  setShowLogo,
  society,
}) {

  useEffect(() => {

    const handleKeyDown = (e) => {

      if (e.key === "Escape") {

        setShowLogo(false);

      }

    };

    if (showLogo) {

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

  }, [showLogo, setShowLogo]);

  if (!showLogo) return null;

  return (

    <div
      onClick={() => setShowLogo(false)}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-md
        p-4
        sm:p-6
        animate-[fadeIn_.25s_ease]
      "
    >

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          relative
          animate-[zoomIn_.25s_ease]
        "
      >

        {/* Close Button */}

        <button
          onClick={() =>
            setShowLogo(false)
          }
          className="
            absolute
            -top-3
            -right-3
            sm:-top-5
            sm:-right-5
            z-20
            flex
            h-10
            w-10
            sm:h-11
            sm:w-11
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-xl
            transition-all
            duration-200
            hover:scale-110
            hover:bg-slate-100
          "
        >

          <X size={20} className="sm:w-[22px] sm:h-[22px]" />

        </button>

        {/* Logo */}

        <img
          src={
            society?.logo ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              society?.societyName ||
                "Society"
            )}`
          }
          alt="Society Logo"
          draggable={false}
          className="
            max-w-[90vw]
            sm:max-w-[80vw]
            max-h-[75vh]
            sm:max-h-[80vh]
            rounded-2xl
            sm:rounded-3xl
            bg-white
            p-2
            sm:p-3
            object-contain
            shadow-2xl
            transition-transform
            duration-300
            hover:scale-[1.02]
            select-none
          "
        />

      </div>

      {/* Custom Animations */}

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

export default LogoModal;