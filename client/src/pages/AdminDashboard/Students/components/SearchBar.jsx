import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (

    <div className="relative mb-8">

      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Name or Roll Number..."
        className="
          w-full
          pl-14
          pr-5
          py-4
          bg-white
          border
          border-slate-300
          rounded-2xl
          outline-none
          focus:border-slate-500
          transition
        "
      />

    </div>

  );
}

export default SearchBar;