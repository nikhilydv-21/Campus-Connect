import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import DashboardHome from "./DashboardHome";
import PendingSocieties from "./PendingSocieties/PendingSocieties";
import AllSocieties from "./AllSocieties/AllSocieties";
import Students from "./Students/Students";
import Events from "./Events/Events";

function AdminDashboard() {

  const [activePage, setActivePage] =
    useState("dashboard");

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

export default AdminDashboard;