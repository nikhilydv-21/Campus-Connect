function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6">

      <h3 className="text-sm sm:text-lg text-gray-500 break-words">
        {title}
      </h3>

      <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl font-bold text-blue-600 break-words">
        {value}
      </h2>

    </div>
  );
}

export default StatCard;