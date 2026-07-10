import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (

    <div className="relative mb-8">

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search society by name..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          pl-12
          pr-4
          py-3
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