import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

      <div className="grid md:grid-cols-2 gap-5">

        {/* Search */}

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

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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

          <option value="Completed">
            Completed
          </option>

        </select>

      </div>

    </div>
  );
}

export default SearchBar;