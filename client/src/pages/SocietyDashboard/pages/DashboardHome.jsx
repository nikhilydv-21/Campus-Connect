function DashboardHome() {
  const society =
    JSON.parse(localStorage.getItem("society")) || {
      societyName: "Society",
    };

  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          {society.societyName}
        </p>
      </div>

      {/* Welcome Card */}
      <div className="bg-white rounded-3xl shadow-lg p-10">

        <h2 className="text-2xl font-semibold text-blue-600">
          Your Society Workspace
        </h2>

        <p className="text-gray-500 mt-5 leading-7">
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