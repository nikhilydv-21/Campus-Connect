import { CalendarX } from "lucide-react";

function EmptyState() {

  return (

    <div className="bg-white rounded-3xl py-20 flex flex-col items-center justify-center shadow-sm">

      <CalendarX
        size={70}
        className="text-gray-300"
      />

      <h2 className="text-2xl font-bold text-slate-700 mt-6">

        No Events Found

      </h2>

      <p className="text-gray-500 mt-2">

        No events match your search.

      </p>

    </div>

  );

}

export default EmptyState;