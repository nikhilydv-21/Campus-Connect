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

      case "notifications":
        return <Notifications />;

      case "settings":
        return <Settings />;

      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex bg-slate-100">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 flex flex-col h-screen">

       <Navbar setActivePage={setActivePage} />

        <div className="flex-1 overflow-auto p-8">

          {renderPage()}

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;