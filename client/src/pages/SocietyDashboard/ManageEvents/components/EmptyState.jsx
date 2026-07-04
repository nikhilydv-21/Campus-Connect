import { CalendarX } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

      <CalendarX
        size={70}
        className="mx-auto text-gray-400"
      />

      <h2 className="text-2xl font-bold mt-6">
        No Events Found
      </h2>

      <p className="text-gray-500 mt-3">
        You haven't created any events yet.
      </p>

    </div>
  );
}

export default EmptyState;