import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="relative mb-6 sm:mb-8">

      <Search
        size={20}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search society..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          h-11
          sm:h-12
          pl-10
          sm:pl-12
          pr-4
          text-sm
          sm:text-base
          bg-white
          border
          border-slate-300
          rounded-xl
          outline-none
          focus:border-slate-500
          transition
        "
      />

    </div>
  );
}

export default SearchBar;