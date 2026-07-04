import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 mb-8">

      <div className="flex flex-col md:flex-row gap-5">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search events or societies..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-14 pr-5 py-4 text-lg border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="w-full md:w-64 px-5 py-4 text-lg border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
        >
          <option value="">
            All Status
          </option>

          <option value="Upcoming">
            Upcoming
          </option>

          <option value="Ongoing">
            Ongoing
          </option>
        </select>

      </div>

    </div>
  );
}

export default SearchBar;