function StatusFilter({
  status,
  setStatus,
}) {
  return (
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
        outline-none
        focus:border-blue-600
        shadow-sm
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

     
      <option value="Cancelled">
        Cancelled
      </option>
    </select>
  );
}

export default StatusFilter;