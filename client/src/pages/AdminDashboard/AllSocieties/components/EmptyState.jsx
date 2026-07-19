import { Building2 } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center">

      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center">

        <Building2
          size={32}
          className="text-blue-600 sm:w-[38px] sm:h-[38px]"
        />

      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-5 sm:mt-6 text-center">
        No Societies Found
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mt-3 text-center max-w-md leading-6">
        There are no approved societies matching your search.
      </p>

    </div>
  );
}

export default EmptyState;