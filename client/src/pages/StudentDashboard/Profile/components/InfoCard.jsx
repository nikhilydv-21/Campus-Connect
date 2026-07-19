function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div
      className="
        border
        rounded-2xl
        p-5
        sm:p-6
        flex
        items-start
        gap-4
        hover:shadow-md
        transition
      "
    >
      <div
        className="
          text-blue-600
          shrink-0
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm text-gray-500">
          {title}
        </p>

        <p
          className="
            mt-1
            text-sm
            sm:text-base
            font-semibold
            text-slate-800
            break-words
          "
        >
          {value || "Not Available"}
        </p>

      </div>

    </div>
  );
}

export default InfoCard;