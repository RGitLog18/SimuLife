import { useState } from "react";
import "./ViewAllPatients.css";

const mockPatients = [
  { id: 1, name: "Aarav Sharma", age: 29, gender: "Male", mail: "abc@gmail.com" },
  { id: 2, name: "Neha Verma", age: 34, gender: "Female", mail: "abc@gmail.com" },
  { id: 3, name: "Rohit Mehta", age: 41, gender: "Male", mail: "abc@gmail.com " },
  { id: 4, name: "Priya Singh", age: 26, gender: "Female", mail: "abc@gmail.com" },
  { id: 5, name: "Kunal Patel", age: 52, gender: "Male", mail: " abc@gmail.com" },
];

export default function ViewAllPatients({ goToProfile }) {
  const [query, setQuery] = useState("");

  const filteredPatients = mockPatients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="sl-profile">

      

      {/* Header Card */}
      {/* Header Card */}
<div className="sl-profile-header-card">
  <div className="sl-header-row">
    <div>
      <h2 className="sl-profile-display-name">All Patients</h2>
      <p className="sl-profile-display-sub">
        Search and access patient profiles
      </p>
    </div>

    {/* ➕ Add New Patient Button */}
    <button
      className="sl-btn-primary"
      onClick={() => console.log("Add new patient")}
    >
      + Add New Patient
    </button>
  </div>

  <input
    type="text"
    className="sl-form-input sl-patient-search"
    placeholder="Search patient by name..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
</div>


      {/* Patient List */}
      <div className="sl-form-section">
        <div className="sl-patient-list">
          {filteredPatients.length === 0 && (
            <p className="sl-no-results">No patients found</p>
          )}

          {filteredPatients.map((patient) => (
            <div key={patient.id} className="sl-patient-card">
              <div className="sl-patient-info">
                <h4>{patient.name}</h4>
                <p>
                  {patient.gender}, {patient.age} yrs • {patient.mail}
                </p>
              </div>

              <button
                className="sl-btn-secondary"
                onClick={() => goToProfile(patient)}
              >
                Go to Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
