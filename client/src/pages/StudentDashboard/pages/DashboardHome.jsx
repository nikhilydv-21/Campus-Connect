function DashboardHome() {
  const student =
    JSON.parse(localStorage.getItem("student")) || {
      fullName: "Student",
    };

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Heading */}

      <div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-base sm:text-lg text-gray-500 break-words">
          {student.fullName}
        </p>

      </div>

      {/* Welcome Card */}

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10">

        <h2 className="text-xl sm:text-2xl font-semibold text-blue-600">
          Your Student Workspace
        </h2>

        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500 leading-7 sm:leading-8">
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