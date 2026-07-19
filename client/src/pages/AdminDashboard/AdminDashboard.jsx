import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import DashboardHome from "./DashboardHome";
import PendingSocieties from "./PendingSocieties/PendingSocieties";
import AllSocieties from "./AllSocieties/AllSocieties";
import Students from "./Students/Students";
import Events from "./Events/Events";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  // Mobile Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome />;

      case "pending-societies":
        return <PendingSocieties />;

      case "societies":
        return <AllSocieties />;

      case "students":
        return <Students />;

      case "events":
        return <Events />;

      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar
          setActivePage={setActivePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;