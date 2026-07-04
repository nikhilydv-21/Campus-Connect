import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAnalytics } from "../../../services/analyticsServices";

import StatCard from "./components/StatCard";
import PopularEventCard from "./components/PopularEventCard";

function Analytics() {
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState({
    totalEvents: 0,
    activeEvents: 0,
    pastEvents: 0,
    totalRegistrations: 0,
    totalMembers: 0,

    mostPopularEvent: {
      title: "N/A",
      registrations: 0,
    },
  });

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await getAnalytics();

      setAnalytics(response.analytics);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load analytics"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-8">

      {/* Heading */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-800">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Track your society performance and event statistics.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">

        <StatCard
          title="Total Events"
          value={analytics.totalEvents}
        />

        <StatCard
          title="Active Events"
          value={analytics.activeEvents}
        />

        <StatCard
          title="Past Events"
          value={analytics.pastEvents}
        />

        <StatCard
          title="Total Registrations"
          value={analytics.totalRegistrations}
        />

        <StatCard
          title="Total Members"
          value={analytics.totalMembers}
        />

        <PopularEventCard
          event={analytics.mostPopularEvent}
        />

      </div>

    </div>
  );
}

export default Analytics;