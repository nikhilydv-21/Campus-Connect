import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex items-center">

      <Search
        className="text-gray-400 mr-3"
        size={22}
      />

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search societies..."
        className="w-full outline-none text-lg"
      />

    </div>
  );
}

export default SearchBar;