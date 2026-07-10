import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  attendanceFilter,
  setAttendanceFilter,
}) {
  return (
    <div className="flex-1">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}

        <div className="relative md:col-span-3">

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
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              bg-white
              border
              rounded-2xl
              pl-12
              pr-4
              py-3
              shadow-sm
              outline-none
              focus:ring-2
              focus:ring-blue-500
              transition
            "
          />

        </div>

        {/* Attendance Filter */}

        <select
          value={attendanceFilter}
          onChange={(e) =>
            setAttendanceFilter(e.target.value)
          }
          className="
            w-full
            bg-white
            border
            rounded-2xl
            px-4
            py-3
            shadow-sm
            outline-none
            focus:ring-2
            focus:ring-blue-500
            transition
          "
        >

          <option value="">
            All
          </option>

          <option value="Attended">
            Present
          </option>

          <option value="Registered">
            Absent
          </option>

        </select>

      </div>

    </div>
  );
}

export default SearchBar;