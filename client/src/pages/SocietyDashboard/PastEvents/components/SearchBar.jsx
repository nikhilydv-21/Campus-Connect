import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="relative">

      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
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
          outline-none
          focus:border-blue-600
        "
      />

    </div>
  );
}

export default SearchBar;