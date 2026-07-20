import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="relative w-full">

      <Search
        size={20}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type="text"
        placeholder="Search past events..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          bg-white
          border
          rounded-xl
          pl-12
          pr-4
          py-3
          text-sm
          sm:text-base
          outline-none
          focus:border-blue-600
          transition
        "
      />

    </div>
  );
}

export default SearchBar;