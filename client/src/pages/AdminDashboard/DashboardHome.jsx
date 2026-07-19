import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getDashboard } from "../../services/adminServices";

function DashboardHome() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboard();

      setDashboard(response.dashboard);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-lg font-medium">
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Students",
      value: dashboard.totalStudents,
    },
    {
      title: "Approved Societies",
      value: dashboard.totalSocieties,
    },
    {
      title: "Pending Societies",
      value: dashboard.pendingSocieties,
    },
    {
      title: "Total Events",
      value: dashboard.totalEvents,
    },
    {
      title: "Active Events",
      value: dashboard.activeEvents,
    },
    {
      title: "Completed Events",
      value: dashboard.pastEvents,
    },
    {
      title: "Registrations",
      value: dashboard.totalRegistrations,
    },
  ];

  return (
    <div>

      {/* Heading */}

      <div className="mb-6 sm:mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Welcome to Campus Connect Admin Panel.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-3xl shadow-md p-5 sm:p-6"
          >

            <p className="text-sm sm:text-base text-gray-500">
              {card.title}
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-blue-600 break-words">
              {card.value}
            </h2>

          </div>

        ))}

      </div>

      {/* Popular Event */}

      <div className="bg-white rounded-3xl shadow-md mt-6 sm:mt-8 p-5 sm:p-8">

        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Most Popular Event
        </h2>

        {dashboard.mostPopularEvent ? (
          <>

            <h3 className="text-lg sm:text-xl font-semibold break-words">
              {dashboard.mostPopularEvent.title}
            </h3>

            <p className="text-gray-500 mt-3 text-sm sm:text-base break-words">
              Society:{" "}
              <span className="font-medium text-slate-700">
                {dashboard.mostPopularEvent.organizer?.societyName}
              </span>
            </p>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Registrations:{" "}
              {dashboard.mostPopularEvent.totalRegistrations}
            </p>

          </>
        ) : (
          <p className="text-gray-500">
            No event available.
          </p>
        )}

      </div>

    </div>
  );
}

export default DashboardHome;