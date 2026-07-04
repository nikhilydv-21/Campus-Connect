import { CalendarX } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-md p-14 text-center">

      <CalendarX
        size={70}
        className="mx-auto text-gray-300"
      />

      <h2 className="text-2xl font-bold mt-6 text-slate-700">
        No Registered Events
      </h2>

      <p className="text-gray-500 mt-3">
        You haven't registered for any events yet.
      </p>

    </div>
  );
}

export default EmptyState;