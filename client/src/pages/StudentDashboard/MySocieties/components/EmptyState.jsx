import { Users } from "lucide-react";

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
        justify-center
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
          bg-blue-100
          flex
          items-center
          justify-center
        "
      >
        <Users
          size={36}
          className="text-blue-600 sm:w-[42px] sm:h-[42px]"
        />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-5">
        No Societies Joined
      </h2>

      <p
        className="
          mt-3
          text-sm
          sm:text-base
          text-gray-500
          leading-7
          max-w-md
        "
      >
        You haven't joined any society yet.
        <br />
        Explore societies and become a volunteer.
      </p>
    </div>
  );
}

export default EmptyState;