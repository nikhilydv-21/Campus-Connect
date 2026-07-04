import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
}) {

  return (

    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col lg:flex-row gap-4">

      {/* Search */}

      <div className="relative flex-1">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search event or organizer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full pl-11 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      {/* Category */}

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      >

        <option value="">
          All Categories
        </option>

        <option value="Technical">
          Technical
        </option>

        <option value="Workshop">
          Workshop
        </option>

        <option value="Hackathon">
          Hackathon
        </option>

        <option value="Seminar">
          Seminar
        </option>

        <option value="Sports">
          Sports
        </option>

        <option value="Cultural">
          Cultural
        </option>

        <option value="Placement">
          Placement
        </option>

        <option value="Competition">
          Competition
        </option>

        <option value="Other">
          Other
        </option>

      </select>

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

        <option value="Cancelled">
          Cancelled
        </option>

      </select>

    </div>

  );

}

export default SearchBar;