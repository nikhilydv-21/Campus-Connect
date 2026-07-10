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