import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: 'SimuLife has revolutionized how I approach treatment planning. Being able to simulate outcomes before prescribing gives me confidence and peace of mind.',
      author: 'Dr. Sarah Chen',
      role: 'Cardiologist, Boston Medical Center',
      rating: 5
    },
    {
      id: 2,
      text: 'The explainable recommendations help me communicate risks and benefits to patients. It\'s truly personalized medicine in action.',
      author: 'Dr. Michael Roberts',
      role: 'Internal Medicine Physician, Stanford',
      rating: 5
    },
    {
      id: 3,
      text: 'We\'ve seen a 35% reduction in adverse drug events since implementing SimuLife. The ROI in patient outcomes is remarkable.',
      author: 'Dr. Jennifer Wong',
      role: 'Chief Medical Officer, Seattle Healthcare Network',
      rating: 5
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="section-header">
        <h2>Healthcare Professionals Trust SimuLife</h2>
        <p>Real feedback from real clinicians using our platform</p>
      </div>
      
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-stars">
              {Array(testimonial.rating).fill('⭐').join('')}
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-author">{testimonial.author}</div>
            <div className="testimonial-role">{testimonial.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}9