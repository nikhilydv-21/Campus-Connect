import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="relative mb-6 sm:mb-8">

      <Search
        size={20}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Name or Roll Number..."
        className="
          w-full
          h-11
          sm:h-14
          pl-10
          sm:pl-14
          pr-4
          sm:pr-5
          text-sm
          sm:text-base
          bg-white
          border
          border-slate-300
          rounded-xl
          sm:rounded-2xl
          outline-none
          focus:border-slate-500
          transition
        "
      />

    </div>
  );
}

export default SearchBar;