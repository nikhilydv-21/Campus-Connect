import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import DashboardHome from "./pages/DashboardHome";
import Profile from "./Profile/Profile";
import CreateEvent from "./CreateEvent/CreateEvent";
import ManageEvents from "./ManageEvents/ManageEvents";
import EditEvent from "./EditEvent/EditEvent";
import PastEvents from "./PastEvents/PastEvents";
import JoinRequests from "./JoinRequests/JoinRequests";
import Analytics from "./Analytics/Analytics";
import Settings from "./Settings/Settings";
import Participants from "./Participants/Participants";
import Feedback from "./Feedback/Feedback";
function SocietyDashboard() {
  const [activePage, setActivePage] =
    useState("dashboard");

  const [selectedEventId, setSelectedEventId] =
    useState(null);

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <Profile />;

      case "create-event":
        return <CreateEvent />;

      case "manage-events":
        return (
          <ManageEvents
            setActivePage={setActivePage}
            setSelectedEventId={setSelectedEventId}
          />
        );

      case "edit-event":
        return (
          <EditEvent
            eventId={selectedEventId}
            setActivePage={setActivePage}
          />
        );

      case "participants":
        return (
          <Participants
            eventId={selectedEventId}
            setActivePage={setActivePage}
          />
        );

      case "past-events":
        return <PastEvents />;

      case "join-requests":
        return <JoinRequests />;

      case "analytics":
        return <Analytics />;

      case "settings":
        return <Settings />;
        
      case "feedback":
        return (
          <Feedback
            eventId={selectedEventId}
            setActivePage={setActivePage}
          />
        );



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

        <Navbar
          setActivePage={setActivePage}
        />

        <div className="flex-1 overflow-auto p-8">

          {renderPage()}

        </div>

      </div>

    </div>
  );
}

export default SocietyDashboard;