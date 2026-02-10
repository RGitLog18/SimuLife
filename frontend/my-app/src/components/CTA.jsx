import React, { useState } from 'react';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted:', email);
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="cta" id="cta">
      <div className="cta-background">
        <div className="gradient-orb gradient-orb-3"></div>
        <div className="gradient-orb gradient-orb-4"></div>
      </div>

      <div className="cta-content">
        <h2>Ready to Transform Patient Care?</h2>
        <p>Join hundreds of healthcare providers already using SimuLife for precision medicine decisions</p>
        
        <form className="cta-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="cta-input"
          />
          <button type="submit" className="cta-button">
            {submitted ? 'Thank You!' : 'Start Free Trial'}
          </button>
        </form>

        {submitted && (
          <p className="success-message">
            Check your email for early access and a demo invitation!
          </p>
        )}

        <p className="cta-footer-text">
          No credit card required. 14-day free trial. Cancel anytime.
        </p>
      </div>
    </section>
  );
}