import { CalendarX2 } from "lucide-react";

function EmptyState() {

  return (

    <div
      className="
        rounded-2xl
        sm:rounded-3xl
        bg-white
        py-16
        sm:py-20
        shadow-lg
      "
    >

      <div className="flex flex-col items-center px-6 text-center">

        <CalendarX2
          size={56}
          className="text-gray-400 sm:h-[70px] sm:w-[70px]"
        />

        <h2
          className="
            mt-5
            sm:mt-6
            text-xl
            sm:text-2xl
            font-bold
            text-slate-800
          "
        >

          No Past Events

        </h2>

        <p
          className="
            mt-3
            text-sm
            sm:text-base
            text-gray-500
            break-words
          "
        >

          Completed events will appear here.

        </p>

      </div>

    </div>

  );

}

export default EmptyState;