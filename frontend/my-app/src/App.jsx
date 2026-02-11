import { useState } from "react";
import "./App.css";

import Sidebar from "./Components/Sidebar";
import Profile from "./pages/Profile";
import ExitUser from "./pages/ExitUser";
import PreviousHistory from "./pages/PreviousHistory";
import DetectNew from "./pages/DetectNew";
import ViewAllPatients from "./pages/ViewAllPatients";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import LoginReg from "./Components/loginreg";
import HowItWorks from "./components/HowItWorks"
/* Feedback */
import Feedback from "./components/Feedback"; // create this component

// import Hero from "./components/Hero";
// import Features from "./components/Features";
// import Testimonials from "./components/Testimonials";
// import Footer from "./components/Footer";
// import Navigation from "./components/Navigation";
// import LoginReg from "./Components/loginreg";
// import Feedback from "./components/Feedback";

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
        <HowItWorks/>
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
    return (
      <Feedback openLogin={() => setView("login")} />


    );
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
  setView={setView}          // 👈 REQUIRED
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
