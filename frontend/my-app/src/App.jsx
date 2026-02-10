import { useState } from "react";
import "./App.css";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import LoginReg from "./components/LoginReg";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">

      {/* If Login is true → show LoginReg */}
      {showLogin ? (
        <LoginReg />
      ) : (
        <>
          <Navigation />
          <Hero openLogin={() => setShowLogin(true)} />
          <Features />
          <HowItWorks />
          <Testimonials />
          <CTA />
          <Footer />
        </>
      )}

    </div>
  );
}

export default App;