import { CalendarX } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-md py-14 sm:py-20 px-6 flex flex-col items-center justify-center text-center">

      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-100 flex items-center justify-center">

        <CalendarX
          size={36}
          className="sm:w-[42px] sm:h-[42px] text-blue-600"
        />

      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-5 sm:mt-6">
        No Events Found
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-md leading-7">
        There are no events available at the moment.
        <br />
        Check back later for upcoming events.
      </p>

    </div>
  );
}

export default EmptyState;