import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

      {/* Search */}

      <div className="relative md:col-span-3">

        <Search
          size={20}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Search by event or society..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            h-12
            pl-11
            pr-4
            border
            border-slate-300
            rounded-xl
            bg-white
            text-slate-700
            placeholder:text-slate-400
            outline-none
            focus:border-slate-500
            transition-all
          "
        />

      </div>

      {/* Filter */}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="
          h-12
          border
          border-slate-300
          rounded-xl
          px-4
          bg-white
          text-slate-700
          outline-none
          focus:border-slate-500
          transition-all
        "
      >

        <option value="">All Events</option>

        <option value="Upcoming">Upcoming</option>

        <option value="Ongoing">Ongoing</option>

        <option value="Completed">Completed</option>

      </select>

    </div>

  );
}

export default SearchBar;