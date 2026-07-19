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

    <div className="flex flex-col lg:flex-row gap-4 mb-8">

      {/* Search */}

      <div className="relative flex-1">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search event or organizer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            pl-12
            pr-4
            py-3
            bg-white
            border
            border-slate-300
            rounded-xl
            outline-none
            focus:border-slate-500
            transition
          "
        />

      </div>

      {/* Category */}

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="
          bg-white
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
          outline-none
          focus:border-slate-500
          transition
        "
      >

        <option value="">All Categories</option>
        <option value="Technical">Technical</option>
        <option value="Workshop">Workshop</option>
        <option value="Hackathon">Hackathon</option>
        <option value="Seminar">Seminar</option>
        <option value="Sports">Sports</option>
        <option value="Cultural">Cultural</option>
        <option value="Placement">Placement</option>
        <option value="Competition">Competition</option>
        <option value="Other">Other</option>

      </select>

      {/* Status */}

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="
          bg-white
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
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

  );

}

export default SearchBar;