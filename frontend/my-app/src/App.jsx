import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import PreviousHistory from "./pages/PreviousHistory";
import DetectNew from "./pages/DetectNew";

function App() {
  // 🔥 Directly start on HOME
  const [view, setView] = useState("home"); // landing | login | home
  const [activePage, setActivePage] = useState("profile"); // ✅ default page
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
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

  /* ═══════════════════════════════════
     🚫 LANDING PAGE (DISABLED)
     ═══════════════════════════════════ */
  /*
  if (view === "landing") {
    return (
      <div className="app">
        <Navigation />
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    );
  }
  */

  /* ═══════════════════════════════════
     🚫 LOGIN PAGE (DISABLED)
     ═══════════════════════════════════ */
  /*
  if (view === "login") {
    return <LoginReg onSuccess={() => setView("home")} />;
  }
  */

  /* ═══════════════════════════════════
     ✅ HOME PAGE (SIDEBAR + PROFILE)
     ═══════════════════════════════════ */
  return (
    <div className="sl-home">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <main
        className={`sl-main ${sidebarCollapsed ? "sl-main--expanded" : ""}`}
      >
        <div className="sl-topbar">
          <button
            className="sl-menu-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            {/* <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg> */}
          </button>

          <div className="sl-topbar-title">
            {activePage === "profile" && "My Profile"}
            {activePage === "history" && "Previous History"}
            {activePage === "detect" && "Detect New"}
          </div>
        </div>

        <div className="sl-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
