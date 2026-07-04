function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-md p-12 text-center">

      <h2 className="text-2xl font-bold text-slate-700">
        No Pending Societies
      </h2>

      <p className="text-gray-500 mt-3">
        There are no societies waiting for approval.
      </p>

    </div>
  );
}

export default EmptyState;