import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search by event or society..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

    </div>
  );
}

export default SearchBar;