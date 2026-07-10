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
      flex
      items-start
      gap-4
      hover:shadow-md
      transition
      "
    >

      <div className="text-blue-600">
        {icon}
      </div>

      <div>

        <p className="text-sm text-gray-500">
          {title}
        </p>

        <p className="font-semibold text-slate-800 mt-1">
          {value || "Not Available"}
        </p>

      </div>

    </div>

  );
}

export default InfoCard;