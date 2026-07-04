import { Users } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-md py-20 flex flex-col items-center justify-center">

      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">

        <Users
          size={42}
          className="text-blue-600"
        />

      </div>

      <h2 className="text-2xl font-bold text-slate-800 mt-6">

        No Societies Joined

      </h2>

      <p className="text-gray-500 mt-3 text-center max-w-md">

        You haven't joined any society yet.

        <br />

        Explore societies and become a volunteer.

      </p>

    </div>
  );
}

export default EmptyState;