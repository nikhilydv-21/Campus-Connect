import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import DashboardHome from "./pages/DashboardHome";
import Profile from "./Profile/Profile";

import Societies from "./ExploreSocieties/ExploreSocieties";
import MySocieties from "./MySocieties/MySocieties";

import Events from "./ExploreEvents/ExploreEvents";
import MyRegistrations from "./MyRegistrations/MyRegistrations";

import LikedEvents from "./LikedEvents/LikedEvents";

import Settings from "./Settings/Settings";

function StudentDashboard() {

  const [activePage, setActivePage] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const renderPage = () => {

    switch (activePage) {

      case "profile":
        return <Profile />;

      case "societies":
        return <Societies />;

      case "my-societies":
        return <MySocieties />;

      case "events":
        return <Events />;

      case "registrations":
        return <MyRegistrations />;

      case "liked-events":
        return <LikedEvents />;


      case "settings":
        return <Settings />;

      default:
        return <DashboardHome />;

    }

  };

  return (

    <div className="flex h-screen bg-slate-100 overflow-hidden">

      {/* Mobile Overlay */}

      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />

      )}

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar
          setActivePage={setActivePage}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

          {renderPage()}

        </div>

      </div>

    </div>

  );

}

export default StudentDashboard;