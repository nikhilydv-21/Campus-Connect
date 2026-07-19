import { CalendarX } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl py-14 sm:py-20 px-6 flex flex-col items-center justify-center text-center shadow-sm">

      <CalendarX
        size={56}
        className="text-gray-300 sm:w-[70px] sm:h-[70px]"
      />

      <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mt-5 sm:mt-6">
        No Events Found
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mt-2 leading-6">
        No events match your search.
      </p>

    </div>
  );
}

export default EmptyState;