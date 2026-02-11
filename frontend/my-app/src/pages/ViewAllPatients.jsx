'use client';

import { useState, useEffect } from "react";
import "./ViewAllPatients.css";
import ExitUser from "./ExitUser";

export default function ViewAllPatients({ onAddNew, onOpenExisting }) {

  const [patients, setPatients] = useState([]); // State for dynamic data
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  // const [selectedEmail, setSelectedEmail] = useState(null);
  
  const sendEmail = (email) => {
    // Open ExitUser component with email
    setSelectedEmail(email);

  };

  // Fetch patients from MongoDB via the Node.js backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:9000/get-all-patients");
        
        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        } else {
          console.error("Failed to fetch patients");
        }
      } catch (error) {
        console.error("Error connecting to server:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter uses 'fullName' (matching your database schema)
  const filteredPatients = patients.filter((p) =>
    (p.fullName || "").toLowerCase().includes(query.toLowerCase()) ||
    (p.email || "").toLowerCase().includes(query.toLowerCase())
  );

  // if (selectedEmail) {
  //   return <ExitUser email={selectedEmail} />;
  // }

  return (
    <div className="sl-profile">
      {/* Header Card */}
      <div className="sl-profile-header-card">
        <div className="sl-header-row">
          <div>
            <h2 className="sl-profile-display-name">All Patients</h2>
            <p className="sl-profile-display-sub">
              {loading ? "Loading records..." : `Showing ${filteredPatients.length} patient(s)`}
            </p>
          </div>

          <button
  className="sl-btn-primary"
  onClick={onAddNew}
>
  + Add New Patient
</button>

        </div>

        <input
          type="text"
          className="sl-form-input sl-patient-search"
          placeholder="Search patient by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Patient List */}
      <div className="sl-form-section">
        <div className="sl-patient-list">
          {loading ? (
            <p className="sl-no-results">Connecting to Database...</p>
          ) : filteredPatients.length === 0 ? (
            <p className="sl-no-results">No patients found</p>
          ) : (
            filteredPatients.map((patient) => (
              <div key={patient._id} className="sl-patient-card">
                <div className="sl-patient-info">
                  {/* Using fields 'fullName' and 'email' from your MongoDB schema */}
                  <h4>{patient.fullName}</h4>
                  <p>
                    {patient.gender}, {patient.age} yrs • {patient.email}
                  </p>
                </div>

                <button
  className="sl-btn-secondary"
  onClick={() => onOpenExisting(patient.email)}
>
  Go to Profile
</button>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}