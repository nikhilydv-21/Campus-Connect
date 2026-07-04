import { Users } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-lg py-20">

      <div className="flex flex-col items-center">

        <Users
          size={70}
          className="text-gray-400"
        />

        <h2 className="text-2xl font-bold mt-6">
          No Join Requests
        </h2>

        <p className="text-gray-500 mt-3">
          There are no pending requests at the moment.
        </p>

      </div>

    </div>
  );
}

export default EmptyState;