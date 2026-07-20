import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (

    <div className="mb-6 sm:mb-8">

      <div className="relative">

        <Search
          size={20}
          className="
            absolute
            left-3
            sm:left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            shrink-0
          "
        />

        <input
          type="text"
          placeholder="Search by event or society..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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
            text-slate-700
            placeholder:text-slate-400
            outline-none
            focus:border-slate-500
            transition-all
          "
        />

      </div>

    </div>

  );
}

export default SearchBar;