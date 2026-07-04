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
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, [showLogo, setShowLogo]);

  if (!showLogo) return null;

  return (
    <div
      onClick={() => setShowLogo(false)}
      className="
        fixed
        inset-0
        bg-black/80
        backdrop-blur-sm
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
          relative
          animate-[fadeIn_.25s_ease]
        "
      >

        {/* Close Button */}

        <button
          onClick={() => setShowLogo(false)}
          className="
            absolute
            -top-5
            -right-5
            w-11
            h-11
            rounded-full
            bg-white
            shadow-lg
            flex
            items-center
            justify-center
            hover:bg-gray-100
            transition
          "
        >
          <X size={22} />
        </button>

        {/* Logo */}

        <img
          src={
            society?.logo ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              society?.societyName || "Society"
            )}`
          }
          alt="Society Logo"
          className="
            max-w-[85vw]
            max-h-[85vh]
            rounded-3xl
            object-contain
            bg-white
            shadow-2xl
            p-2
          "
        />

      </div>

    </div>
  );
}

export default LogoModal;