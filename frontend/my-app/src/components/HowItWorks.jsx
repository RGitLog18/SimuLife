import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Patient Profile Input',
      description: 'Enter the patient\'s medical data including age, vital signs, existing conditions, allergies, and lab indicators. Our system securely stores and processes this information.',
      icon: '📋'
    },
    {
      id: 2,
      title: 'Generate Digital Twin',
      description: 'SimuLife creates a personalized digital twin that models the patient\'s unique biological response patterns using advanced algorithms and AI logic.',
      icon: '🧬'
    },
    {
      id: 3,
      title: 'Simulate Treatments',
      description: 'Test multiple treatment options and dosages in the virtual environment. Compare predicted outcomes without exposing the patient to risk.',
      icon: '⚗️'
    },
    {
      id: 4,
      title: 'Get Recommendations',
      description: 'Receive AI-powered insights with predicted effectiveness, side-effect risks, and explainable recommendations for the best treatment plan.',
      icon: '✨'
    }
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <h2>How SimuLife Works</h2>
        <p>A four-step process to precision medicine</p>
      </div>
      
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={step.id} className="step">
            <div className="step-number">{step.id}</div>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {index < steps.length - 1 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>
    </section>
  );
}