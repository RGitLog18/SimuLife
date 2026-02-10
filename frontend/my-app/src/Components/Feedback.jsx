import { useState } from "react";
import "./Feedback.css";

export default function Feedback({ onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }

    console.log({
      ...formData,
      rating,
    });

    alert("Thank you for your feedback! ❤️");

    // Reset
    setFormData({
      name: "",
      designation: "",
      feedback: "",
    });
    setRating(0);

    // Navigate to View All Patients
    if (onClose) onClose();
  };

  return (
    <div className="feedback-container">
      <form className="feedback-form" onSubmit={handleSubmit}>
        {/* ❌ Close Button */}
        <button
          type="button"
          className="feedback-close-btn"
          onClick={onClose}
          aria-label="Close feedback"
        >
          ✕
        </button>

        <h2>Give Your Feedback</h2>
        <p>We value your opinion 💙</p>

        {/* Star Rating */}
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const value = index + 1;
            return (
              <span
                key={value}
                className={value <= (hover || rating) ? "star active" : "star"}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            );
          })}
        </div>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="designation"
          placeholder="Your Designation"
          value={formData.designation}
          onChange={handleChange}
          required
        />

        <textarea
          name="feedback"
          placeholder="Write your feedback..."
          rows="4"
          value={formData.feedback}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}
