function DashboardHome() {
  const society =
    JSON.parse(
      localStorage.getItem("society")
    ) || {
      societyName: "Society",
    };

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Page Heading */}

      <div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 break-words">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-base sm:text-lg text-gray-500 break-words">
          {society.societyName}
        </p>

      </div>

      {/* Welcome Card */}

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10">

        <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 break-words">
          Your Society Workspace
        </h2>

        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500 leading-6 sm:leading-7 break-words">
          Welcome to your Society Dashboard.
          Manage your profile, organize events,
          review join requests and monitor your
          society activities from one place.
        </p>

      </div>

    </div>
  );
}

export default DashboardHome;