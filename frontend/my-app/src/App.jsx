import { useState } from "react";
import "./App.css";

/* ===== Landing Page Components ===== */
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import LoginReg from "./components/LoginReg";

/* ===== Dashboard Components ===== */
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import PreviousHistory from "./pages/PreviousHistory";
import DetectNew from "./pages/DetectNew";

function App() {
  /* ===== Global App States ===== */
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* ===== Dashboard States ===== */
  const [activePage, setActivePage] = useState("profile");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  /* ===== Dashboard Page Renderer ===== */
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

  /* ===== 1️⃣ AUTHENTICATED DASHBOARD ===== */
  if (isAuthenticated) {
    return (
      <div className="sl-home">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <main className={`sl-main ${sidebarCollapsed ? "sl-main--expanded" : ""}`}>
          <div className="sl-topbar">
            <button
              className="sl-menu-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label="Toggle sidebar"
            >
              <svg
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
              </svg>
            </button>

            <div className="sl-topbar-title">
              {activePage === "profile" && "My Profile"}
              {activePage === "history" && "Previous History"}
              {activePage === "detect" && "Detect New"}
            </div>

            <div className="sl-topbar-actions">
              <button className="sl-notification-btn" aria-label="Notifications">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="sl-notification-dot"></span>
              </button>
            </div>
          </div>

          <div className="sl-content">{renderDashboardPage()}</div>
        </main>
      </div>
    );
  }

  /* ===== 2️⃣ LOGIN / REGISTER ===== */
  if (showLogin) {
    return (
      <LoginReg
        onSuccess={() => {
          setShowLogin(false);
          setIsAuthenticated(true);
        }}
        onBack={() => setShowLogin(false)}
      />
    );
  }

  /* ===== 3️⃣ PUBLIC LANDING PAGE ===== */
  return (
    <div className="app">
      <Navigation />
      <Hero openLogin={() => setShowLogin(true)} />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
