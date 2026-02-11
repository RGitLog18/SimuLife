import { useState } from "react";
import "./App.css";

import Sidebar from "./Components/Sidebar";
import Profile from "./pages/Profile";
import ExitUser from "./pages/ExitUser";
import PreviousHistory from "./pages/PreviousHistory";
import DetectNew from "./pages/DetectNew";
import ViewAllPatients from "./pages/ViewAllPatients";

import Hero from "./Components/Hero";
import Features from "./Components/Features";
import Testimonials from "./Components/Testimonials";
import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation";
import LoginReg from "./Components/LoginReg";
import Feedback from "./components/Feedback";

function App() {
  const [view, setView] = useState("landing");
  // landing | login | patients | dashboard | feedback

  const [activePage, setActivePage] = useState("profile");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [profileMode, setProfileMode] = useState("new");
  // new | existing

  const [selectedEmail, setSelectedEmail] = useState(null);

  /* ---------------- RENDER DASHBOARD PAGE ---------------- */
  const renderDashboardPage = () => {
    if (activePage === "profile") {
      return profileMode === "existing" ? (<>
        <ExitUser email={selectedEmail} />
        <PreviousHistory email={selectedEmail} />
        <DetectNew email={selectedEmail} />
        </>
      ) : (
        <Profile />
      );
    }

    if (activePage === "history") return <PreviousHistory />;
    if (activePage === "detect") return <DetectNew email={selectedEmail}/>;

    return <Profile />;
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
    return <LoginReg onSuccess={() => setView("patients")} />;
  }

  /* ================= VIEW ALL PATIENTS ================= */
  if (view === "patients") {
    return (
      <ViewAllPatients
        onAddNew={() => {
          setProfileMode("new");
          setSelectedEmail(null);
          setActivePage("profile");
          setView("dashboard");
        }}
        onOpenExisting={(email) => {
          setProfileMode("existing");
          setSelectedEmail(email);
          setActivePage("profile");
          setView("dashboard");
        }}
      />
    );
  }

  /* ================= FEEDBACK ================= */
  if (view === "feedback") {
    return <Feedback onClose={() => setView("landing")} />;
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

        <div className="sl-content">{renderDashboardPage()}</div>
      </main>
    </div>
  );
}

export default App;
