import {
  Award,
  Loader2,
} from "lucide-react";

function GenerateCertificateModal({
  open,
  setOpen,
  onConfirm,
  loading,
}) {

  if (!open) return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
        p-4
        sm:p-5
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          sm:rounded-3xl
          bg-white
          p-6
          sm:p-8
          shadow-2xl
        "
      >

        {/* Icon */}

        <div className="flex justify-center">

          <div
            className="
              flex
              h-16
              w-16
              sm:h-20
              sm:w-20
              items-center
              justify-center
              rounded-full
              bg-amber-100
            "
          >

            <Award
              size={32}
              className="text-amber-600 sm:h-[38px] sm:w-[38px]"
            />

          </div>

        </div>

        {/* Heading */}

        <h2
          className="
            mt-5
            sm:mt-6
            text-center
            text-xl
            sm:text-2xl
            font-bold
            text-slate-800
          "
        >

          Generate Certificates?

        </h2>

        {/* Badge */}

        <div className="mt-4 flex justify-center">

          <span
            className="
              rounded-full
              border
              border-amber-200
              bg-amber-50
              px-4
              py-1.5
              text-center
              text-[11px]
              sm:text-xs
              font-semibold
              text-amber-700
            "
          >

            This action cannot be undone

          </span>

        </div>

        {/* Description */}

        <p
          className="
            mt-5
            sm:mt-6
            text-center
            text-sm
            sm:text-base
            leading-6
            sm:leading-7
            text-gray-600
          "
        >

          You're about to generate participation
          certificates for all attended students.

        </p>

        {/* Buttons */}

        <div
          className="
            mt-8
            sm:mt-10
            flex
            flex-col
            sm:flex-row
            gap-3
            sm:gap-4
          "
        >

          <button
            disabled={loading}
            onClick={() => setOpen(false)}
            className="
              flex-1
              rounded-xl
              border
              border-slate-300
              py-3
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-100
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            Cancel

          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:bg-blue-400
            "
          >

            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Generating...
              </>
            ) : (
              <>
                <Award size={18} />
                Generate
              </>
            )}

          </button>

        </div>

      </div>

    </div>

  );

}

export default GenerateCertificateModal;