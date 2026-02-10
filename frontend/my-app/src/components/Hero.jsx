import React from 'react';

export default function Hero({ openLogin }) {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">

      <div className="hero-background">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
      </div>

      <div className="hero-content">

        <div className="hero-badge">
          <span>✨ Precision Medicine Revolution</span>
        </div>

        <h1 className="hero-title">
          Predictive Bio-Digital Twins forPrecision Medicine
        </h1>

        <p className="hero-subtitle">
          Transform healthcare from trial-and-error prescribing to simulation-first
          precision medicine. SimuLife enables clinicians to predict treatment outcomes
          before real-world prescription, improving safety, confidence, and personalization.
        </p>

        <div className="hero-buttons">

          {/* Start Free Trial → Opens Login */}
          <button className="btn-primary" onClick={openLogin}>
            Start Free Trial
          </button>

          {/* Scroll Button */}
          <button
            className="btn-secondary"
            onClick={() => scrollToSection('how-it-works')}
          >
            See How It Works →
          </button>

        </div>

        <div className="hero-stats">

          <div className="stat">
            <h3>98.5%</h3>
            <p>Accuracy Rate</p>
          </div>

          <div className="stat">
            <h3>50K+</h3>
            <p>Simulations Run</p>
          </div>

          <div className="stat">
            <h3>500+</h3>
            <p>Healthcare Providers</p>
          </div>

        </div>

      </div>

    </section>
  );
}