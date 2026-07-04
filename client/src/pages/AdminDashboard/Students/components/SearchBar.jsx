import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {

  return (

    <div className="bg-white rounded-3xl shadow-md p-6">

      <div className="relative">

        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by Name or Roll Number..."
          className="w-full pl-14 pr-5 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

    </div>

  );

}

export default SearchBar;