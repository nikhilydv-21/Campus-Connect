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
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search events or societies..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            h-11
            sm:h-12
            border
            border-slate-300
            rounded-xl
            pl-10
            sm:pl-11
            pr-4
            text-sm
            sm:text-base
            bg-white
            outline-none
            transition
            focus:border-slate-500
          "
        />

      </div>

      {/* Status Filter */}

      <div className="md:col-span-1">

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="
            w-full
            h-11
            sm:h-12
            border
            border-slate-300
            rounded-xl
            px-4
            text-sm
            sm:text-base
            bg-white
            outline-none
            transition
            focus:border-slate-500
          "
        >

          <option value="">
            All Events
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