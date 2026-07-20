import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="relative">

      <Search
        size={20}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          pointer-events-none
        "
      />

      <input
        type="text"
        placeholder="Search by student name or roll number..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          bg-white
          border
          rounded-xl
          py-3
          pl-12
          pr-4
          text-sm
          sm:text-base
          placeholder:text-sm
          sm:placeholder:text-base
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

    </div>
  );
}

export default SearchBar;