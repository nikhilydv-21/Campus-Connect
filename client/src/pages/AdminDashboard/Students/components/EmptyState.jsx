import { Users } from "lucide-react";

function EmptyState() {

  return (

    <div className="bg-white rounded-3xl shadow-md py-24 text-center mt-8">

      <Users
        size={70}
        className="mx-auto text-gray-300"
      />

      <h2 className="text-2xl font-bold mt-5">
        No Students Found
      </h2>

      <p className="text-gray-500 mt-2">
        Try searching with another keyword.
      </p>

    </div>

  );

}

export default EmptyState;