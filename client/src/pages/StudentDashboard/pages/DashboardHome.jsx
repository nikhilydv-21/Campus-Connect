function DashboardHome() {
  const student =
    JSON.parse(localStorage.getItem("student")) || {
      fullName: "Student",
    };

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          {student.fullName}
        </p>

      </div>

      {/* Welcome Card */}

      <div className="bg-white rounded-3xl shadow-lg p-10">

        <h2 className="text-2xl font-semibold text-blue-600">
          Your Student Workspace
        </h2>

        <p className="text-gray-500 mt-5 leading-7">
          Welcome to your Student Dashboard.
          Explore societies, register for exciting
          events, manage your profile, view your
          registrations and stay updated with the
          latest campus activities from one place.
        </p>

      </div>

    </div>
  );
}

export default DashboardHome;