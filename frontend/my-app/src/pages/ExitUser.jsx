'use client';

import { useState, useRef, useEffect } from 'react';
import './Profile.css';

function ExitUser({ email }) {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '', age: '', gender: '', bloodGroup: '',
    weight: '', height: '', bp: '', pregnancy: '',
    alcoholConsumption: '', allergies: '', currentMedications: '',
    emergencyContact: '', email: '', phone: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:9000/get-profile/${email}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
          if (data.profilePhotoUrl) setPhotoPreview(data.profilePhotoUrl);
        }
      } catch (error) {
        console.error("Database fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (photoFile) data.append('profilePhoto', photoFile);

    try {
      const response = await fetch('http://localhost:9000/update-profile', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        alert('Database Updated Successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (loading) return <div className="sl-profile">Accessing Patient File...</div>;

  return (
    
    <div className="sl-profile">
      <form className="sl-profile-form" onSubmit={handleSubmit}>
        
        {/* Header Section */}
        <div className="sl-profile-header-card">
          <div className="sl-profile-photo-section">
            <div
              className={`sl-profile-photo ${isEditing ? 'editable' : 'freezed'}`}
              onClick={() => isEditing && fileInputRef.current.click()}
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" />
              ) : (
                <div className="sl-profile-photo-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
              {isEditing && (
                <div className="sl-profile-photo-overlay">
                  <span>Upload</span>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            
            <div className="sl-profile-name-area">
              <h2 className="sl-profile-display-name">{formData.fullName || 'Patient Name'}</h2>
              <span className="sl-profile-display-sub">ID: {formData.email}</span>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="sl-form-section">
          <div className="sl-form-section-header">
            <div className="sl-form-section-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
            <h3>Personal Information</h3>
          </div>
          <div className="sl-form-grid">
            <div className="sl-form-group">
              <label className="sl-form-label">Full Name</label>
              <input type="text" name="fullName" className="sl-form-input" value={formData.fullName} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Age</label>
              <input type="number" name="age" className="sl-form-input" value={formData.age} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Gender</label>
              <select name="gender" className="sl-form-input sl-form-select" value={formData.gender} onChange={handleChange} disabled={!isEditing}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Email</label>
              <input type="email" name="email" className="sl-form-input" value={formData.email} onChange={handleChange} disabled={true} />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Phone</label>
              <input type="tel" name="phone" className="sl-form-input" value={formData.phone} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Emergency Contact</label>
              <input type="tel" name="emergencyContact" className="sl-form-input" value={formData.emergencyContact} onChange={handleChange} disabled={!isEditing} />
            </div>
          </div>
        </div>

        {/* Medical Information Section */}
        <div className="sl-form-section">
          <div className="sl-form-section-header">
            <div className="sl-form-section-icon sl-form-section-icon--accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
            </div>
            <h3>Medical Information</h3>
          </div>
          <div className="sl-form-grid">
            <div className="sl-form-group">
              <label className="sl-form-label">Blood Group</label>
              <select name="bloodGroup" className="sl-form-input sl-form-select" value={formData.bloodGroup} onChange={handleChange} disabled={!isEditing}>
                <option value="">Select</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
              </select>
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Weight (kg)</label>
              <input type="number" name="weight" className="sl-form-input" value={formData.weight} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Height (cm)</label>
              <input type="number" name="height" className="sl-form-input" value={formData.height} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Blood Pressure</label>
              <input type="text" name="bp" className="sl-form-input" value={formData.bp} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Pregnancy Status</label>
              <select name="pregnancy" className="sl-form-input sl-form-select" value={formData.pregnancy} onChange={handleChange} disabled={!isEditing}>
                <option value="not-applicable">Not Applicable</option>
                <option value="yes">Yes</option><option value="no">No</option>
              </select>
            </div>
            <div className="sl-form-group">
              <label className="sl-form-label">Alcohol</label>
              <select name="alcoholConsumption" className="sl-form-input sl-form-select" value={formData.alcoholConsumption} onChange={handleChange} disabled={!isEditing}>
                <option value="no">No</option><option value="yes">Yes</option><option value="occasionally">Occasionally</option>
              </select>
            </div>
          </div>
          <div className="sl-form-grid sl-form-grid--full">
            <div className="sl-form-group sl-form-group--full">
              <label className="sl-form-label">Allergies</label>
              <textarea name="allergies" className="sl-form-input sl-form-textarea" value={formData.allergies} onChange={handleChange} disabled={!isEditing} rows="3" />
            </div>
            <div className="sl-form-group sl-form-group--full">
              <label className="sl-form-label">Current Medications</label>
              <textarea name="currentMedications" className="sl-form-input sl-form-textarea" value={formData.currentMedications} onChange={handleChange} disabled={!isEditing} rows="3" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sl-form-actions">
          {!isEditing ? (
            <button type="button" className="sl-btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
          ) : (
            <>
              <button type="button" className="sl-btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" className="sl-btn-primary">Update Records</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExitUser;