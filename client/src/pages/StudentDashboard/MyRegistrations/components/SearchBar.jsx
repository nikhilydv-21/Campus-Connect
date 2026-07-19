import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">

      {/* Search */}

      <div className="relative md:col-span-3">

        <Search
          size={20}
          className="
            absolute
            left-3
            sm:left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            shrink-0
          "
        />

        <input
          type="text"
          placeholder="Search by event or society..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            h-11
            sm:h-12
            pl-10
            sm:pl-11
            pr-4
            border
            border-slate-300
            rounded-xl
            bg-white
            text-sm
            sm:text-base
            outline-none
            focus:border-slate-500
            transition
          "
        />

      </div>

      {/* Status Filter */}

      <div className="md:col-span-1">

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            w-full
            h-11
            sm:h-12
            border
            border-slate-300
            rounded-xl
            px-4
            bg-white
            text-sm
            sm:text-base
            outline-none
            focus:border-slate-500
            transition
          "
        >

          <option value="">All Events</option>

          <option value="Upcoming">Upcoming</option>

          <option value="Ongoing">Ongoing</option>

          <option value="Completed">Completed</option>

        </select>

      </div>

    </div>

  );
}

export default SearchBar;