function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-md p-8 sm:p-12 text-center">

      <h2 className="text-xl sm:text-2xl font-bold text-slate-700">
        No Pending Societies
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mt-3 leading-6">
        There are no societies waiting for approval.
      </p>

    </div>
  );
}

export default EmptyState;