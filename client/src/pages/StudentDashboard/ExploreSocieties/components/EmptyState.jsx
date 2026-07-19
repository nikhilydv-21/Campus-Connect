import { Building2 } from "lucide-react";

function EmptyState() {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        sm:rounded-3xl
        shadow-md
        py-14
        sm:py-20
        px-6
        flex
        flex-col
        items-center
        text-center
      "
    >
      <div
        className="
          w-20
          h-20
          sm:w-24
          sm:h-24
          rounded-full
          bg-slate-100
          flex
          items-center
          justify-center
        "
      >
        <Building2
          size={36}
          className="text-gray-400 sm:w-[42px] sm:h-[42px]"
        />
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold mt-5 text-slate-800">
        No Societies Found
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mt-3 leading-7 max-w-md">
        Try searching with another name.
      </p>
    </div>
  );
}

export default EmptyState;