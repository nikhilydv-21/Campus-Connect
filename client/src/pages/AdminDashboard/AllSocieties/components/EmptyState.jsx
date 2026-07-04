import { Building2 } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-16 flex flex-col items-center justify-center">

      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">

        <Building2
          size={38}
          className="text-blue-600"
        />

      </div>

      <h2 className="text-2xl font-bold text-slate-800 mt-6">
        No Societies Found
      </h2>

      <p className="text-gray-500 mt-3 text-center max-w-md">
        There are no approved societies matching
        your search.
      </p>

    </div>
  );
}

export default EmptyState;