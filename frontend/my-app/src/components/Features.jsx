import React from 'react';

export default function Features() {
  const features = [
    {
      id: 1,
      icon: '🧬',
      title: 'Digital Twin Technology',
      description: 'Create personalized biological models that simulate patient response patterns based on medical history and vital signs.'
    },
    {
      id: 2,
      icon: '🔮',
      title: 'Predictive Analytics',
      description: 'Leverage AI-assisted predictions to forecast treatment effectiveness and potential side effects before prescription.'
    },
    {
      id: 3,
      icon: '💊',
      title: 'Treatment Simulation',
      description: 'Compare multiple dosage and treatment options in a safe virtual environment to find optimal solutions.'
    },
    {
      id: 4,
      icon: '📊',
      title: 'Explainable Insights',
      description: 'Understand the reasoning behind recommendations with clear, data-driven decision support for clinicians.'
    },
    {
      id: 5,
      icon: '🛡️',
      title: 'Safety First',
      description: 'Minimize adverse reactions by testing treatments virtually before real-world implementation.'
    },
    {
      id: 6,
      icon: '⚡',
      title: 'Real-Time Processing',
      description: 'Get instant simulation results and recommendations to support rapid clinical decision-making.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="section-header">
        <h2>Powerful Features</h2>
        <p>Everything you need for precision medicine decision support</p>
      </div>
      
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}