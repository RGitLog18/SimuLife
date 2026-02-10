import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import PreviousHistory from "./pages/PreviousHistory";
import DetectNew from "./pages/DetectNew";
import ViewAllPatients from "./pages/ViewAllPatients";

/* Feedback */
import Feedback from "./components/Feedback"; // create this component

function App() {
  const [view, setView] = useState("landing"); 
  // landing | login | patients | dashboard | feedback

  const [activePage, setActivePage] = useState("profile");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  /* ---------------- RENDER DASHBOARD PAGE ---------------- */
  const renderDashboardPage = () => {
    switch (activePage) {
      case "profile":
        return <Profile />;
      case "history":
        return <PreviousHistory />;
      case "detect":
        return <DetectNew />;
      default:
        return <Profile />;
    }
  };

  /* ================= LANDING ================= */
  if (view === "landing") {
    return (
      <div className="app">
        <Navigation openLogin={() => setView("login")} />
        <Hero openLogin={() => setView("login")} />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    );
  }

  /* ================= LOGIN ================= */
  if (view === "login") {
    return (
      <LoginReg
        onSuccess={() => setView("patients")}
      />
    );
  }

  /* ================= VIEW ALL PATIENTS ================= */
  if (view === "patients") {
    return (
      <ViewAllPatients
        goToProfile={() => {
          setActivePage("profile");
          setView("dashboard");
        }}
      />
    );
  }

  /* ================= FEEDBACK ================= */
  if (view === "feedback") {
    return (
      <Feedback
        onClose={() => setView("landing")}
      />
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className="sl-home">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onLogout={() => setView("feedback")}
      />

      <main className={`sl-main ${sidebarCollapsed ? "sl-main--expanded" : ""}`}>
        <div className="sl-topbar">
          <div className="sl-topbar-title">
            {activePage === "profile" && "Profile"}
            {activePage === "history" && "Previous History"}
            {activePage === "detect" && "Detect New"}
          </div>
        </div>

        <div className="sl-content">
          {renderDashboardPage()}
        </div>
      </main>
    </div>
  );
}

export default App;