import { Users } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-md py-16 sm:py-24 px-6 text-center mt-8">

      <Users
        size={56}
        className="mx-auto text-gray-300 sm:w-[70px] sm:h-[70px]"
      />

      <h2 className="text-xl sm:text-2xl font-bold mt-5">
        No Students Found
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mt-2 leading-6">
        Try searching with another keyword.
      </p>

    </div>
  );
}

export default EmptyState;