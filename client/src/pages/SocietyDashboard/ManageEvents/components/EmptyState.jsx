import { CalendarX } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg py-14 sm:py-20 px-5">

      <div className="flex flex-col items-center text-center">

        <CalendarX
          size={56}
          className="text-gray-400 sm:w-[70px] sm:h-[70px]"
        />

        <h2 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-bold text-slate-800">
          No Events Found
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-500 break-words">
          You haven't created any events yet.
        </p>

      </div>

    </div>
  );
}

export default EmptyState;