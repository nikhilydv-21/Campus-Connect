function StatusFilter({
  status,
  setStatus,
}) {
  return (
    <div className="w-full">

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
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
  );
}

export default StatusFilter;