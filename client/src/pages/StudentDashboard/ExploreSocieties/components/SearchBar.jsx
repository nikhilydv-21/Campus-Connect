import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        px-4
        py-3
        sm:px-5
        sm:py-4
        flex
        items-center
      "
    >
      <Search
        className="text-gray-400 mr-3 shrink-0"
        size={20}
      />

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search societies..."
        className="
          w-full
          outline-none
          text-sm
          sm:text-base
          lg:text-lg
          placeholder:text-gray-400
        "
      />
    </div>
  );
}

export default SearchBar;