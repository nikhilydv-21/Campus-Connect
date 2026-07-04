import { HeartCrack } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-md p-14 text-center">

      <HeartCrack
        size={70}
        className="mx-auto text-gray-300"
      />

      <h2 className="text-2xl font-bold mt-6 text-slate-700">
        No Liked Events
      </h2>

      <p className="text-gray-500 mt-3">
        You haven't liked any events yet.
      </p>

    </div>
  );
}

export default EmptyState;