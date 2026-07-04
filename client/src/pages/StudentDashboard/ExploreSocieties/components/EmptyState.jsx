import { Building2 } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-md py-20 flex flex-col items-center">

      <Building2
        size={70}
        className="text-gray-300"
      />

      <h2 className="text-2xl font-semibold mt-5">
        No Societies Found
      </h2>

      <p className="text-gray-500 mt-2">
        Try searching with another name.
      </p>

    </div>
  );
}

export default EmptyState;