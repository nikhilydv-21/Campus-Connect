function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h3 className="text-gray-500 text-lg">
        {title}
      </h3>

      <h2 className="text-4xl font-bold text-blue-600 mt-4">
        {value}
      </h2>

    </div>
  );
}

export default StatCard;