'use client';

import { useState, useRef } from 'react';
import './Profile.css';

function Profile() {
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    bloodGroup: '',
    weight: '',
    height: '',
    bp: '',
    pregnancy: '',
    alcoholConsumption: '',
    allergies: '',
    currentMedications: '',
    emergencyContact: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile saved successfully!');
  };

  return (
    <div className="sl-profile">
      {/* Photo Section */}
      <div className="sl-profile-header-card">
        <div className="sl-profile-photo-section">
          <div
            className="sl-profile-photo"
            onClick={() => fileInputRef.current.click()}
          >
            {photoPreview ? (
              <img src={photoPreview || "/placeholder.svg"} alt="Profile" />
            ) : (
              <div className="sl-profile-photo-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
            <div className="sl-profile-photo-overlay">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span>Upload</span>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />
          <div className="sl-profile-name-area">
            <h2 className="sl-profile-display-name">
              {formData.fullName || 'Your Name'}
            </h2>
            <span className="sl-profile-display-sub">Patient</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="sl-profile-form" onSubmit={handleSubmit}>
        {/* Personal Info */}
        <div className="sl-form-section">
          <div className="sl-form-section-header">
            <div className="sl-form-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3>Personal Information</h3>
          </div>
          <div className="sl-form-grid">
            <div className="sl-form-group">
              <label className="sl-form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="sl-form-input"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Age</label>
              <input
                type="number"
                name="age"
                className="sl-form-input"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Gender</label>
              <select
                name="gender"
                className="sl-form-input sl-form-select"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Email</label>
              <input
                type="email"
                name="email"
                className="sl-form-input"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="sl-form-input"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Emergency Contact</label>
              <input
                type="tel"
                name="emergencyContact"
                className="sl-form-input"
                placeholder="+1 (555) 000-0000"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Medical Info */}
        <div className="sl-form-section">
          <div className="sl-form-section-header">
            <div className="sl-form-section-icon sl-form-section-icon--accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3>Medical Information</h3>
          </div>
          <div className="sl-form-grid">
            <div className="sl-form-group">
              <label className="sl-form-label">Blood Group</label>
              <select
                name="bloodGroup"
                className="sl-form-input sl-form-select"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                className="sl-form-input"
                placeholder="Enter weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Height (cm)</label>
              <input
                type="number"
                name="height"
                className="sl-form-input"
                placeholder="Enter height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Blood Pressure</label>
              <input
                type="text"
                name="bp"
                className="sl-form-input"
                placeholder="e.g. 120/80"
                value={formData.bp}
                onChange={handleChange}
              />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Pregnancy Status</label>
              <select
                name="pregnancy"
                className="sl-form-input sl-form-select"
                value={formData.pregnancy}
                onChange={handleChange}
              >
                <option value="">Select status</option>
                <option value="not-applicable">Not Applicable</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Alcohol Consumption</label>
              <select
                name="alcoholConsumption"
                className="sl-form-input sl-form-select"
                value={formData.alcoholConsumption}
                onChange={handleChange}
              >
                <option value="">Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="occasionally">Occasionally</option>
              </select>
            </div>
          </div>
          <div className="sl-form-grid sl-form-grid--full">
            <div className="sl-form-group sl-form-group--full">
              <label className="sl-form-label">Allergies</label>
              <textarea
                name="allergies"
                className="sl-form-input sl-form-textarea"
                placeholder="List any allergies (e.g., Penicillin, Peanuts, Latex)"
                rows="3"
                value={formData.allergies}
                onChange={handleChange}
              />
            </div>
            <div className="sl-form-group sl-form-group--full">
              <label className="sl-form-label">Current Medications</label>
              <textarea
                name="currentMedications"
                className="sl-form-input sl-form-textarea"
                placeholder="List current medications with dosage"
                rows="3"
                value={formData.currentMedications}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sl-form-actions">
          <button type="button" className="sl-btn-secondary">Cancel</button>
          <button type="submit" className="sl-btn-primary">Save Profile</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
