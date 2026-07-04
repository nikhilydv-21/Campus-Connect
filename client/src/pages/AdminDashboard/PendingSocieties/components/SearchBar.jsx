import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">

      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search society..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

    </div>
  );
}

export default SearchBar;