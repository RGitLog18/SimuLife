'use client';

import { useState } from 'react';
import './PreviousHistory.css';

const mockHistory = [
  {
    id: 1,
    disease: 'Type 2 Diabetes',
    date: '2025-12-15',
    status: 'Ongoing',
    severity: 'moderate',
    doctor: 'Dr. Smith',
    summary: 'Blood sugar levels elevated. Prescribed Metformin 500mg twice daily. Follow-up recommended in 3 months.',
    vitals: { bp: '130/85', sugar: '185 mg/dL', weight: '78 kg' },
  },
  {
    id: 2,
    disease: 'Seasonal Allergies',
    date: '2025-09-20',
    status: 'Resolved',
    severity: 'mild',
    doctor: 'Dr. Patel',
    summary: 'Allergic rhinitis triggered by pollen. Cetirizine prescribed. Symptoms resolved in 2 weeks.',
    vitals: { bp: '120/78', sugar: '95 mg/dL', weight: '77 kg' },
  },
  {
    id: 3,
    disease: 'Hypertension',
    date: '2025-06-10',
    status: 'Ongoing',
    severity: 'high',
    doctor: 'Dr. Chen',
    summary: 'Persistent high blood pressure. Amlodipine 5mg prescribed. Lifestyle changes recommended including low sodium diet and exercise.',
    vitals: { bp: '145/92', sugar: '102 mg/dL', weight: '80 kg' },
  },
  {
    id: 4,
    disease: 'Common Cold',
    date: '2025-03-05',
    status: 'Resolved',
    severity: 'mild',
    doctor: 'Dr. Wilson',
    summary: 'Upper respiratory infection. Rest, fluids, and OTC decongestant recommended. Resolved within a week.',
    vitals: { bp: '118/76', sugar: '90 mg/dL', weight: '76 kg' },
  },
];

function PreviousHistory() {
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = filterStatus === 'all'
    ? mockHistory
    : mockHistory.filter(h => h.status.toLowerCase() === filterStatus);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'mild': return 'sl-severity--mild';
      case 'moderate': return 'sl-severity--moderate';
      case 'high': return 'sl-severity--high';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    return status === 'Resolved' ? 'sl-status--resolved' : 'sl-status--ongoing';
  };

  return (
    <div className="sl-history">
      {/* Summary Cards */}
      <div className="sl-history-summary">
        <div className="sl-summary-card">
          <div className="sl-summary-icon sl-summary-icon--total">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="sl-summary-info">
            <span className="sl-summary-value">{mockHistory.length}</span>
            <span className="sl-summary-label">Total Diagnoses</span>
          </div>
        </div>
        <div className="sl-summary-card">
          <div className="sl-summary-icon sl-summary-icon--ongoing">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="sl-summary-info">
            <span className="sl-summary-value">
              {mockHistory.filter(h => h.status === 'Ongoing').length}
            </span>
            <span className="sl-summary-label">Ongoing</span>
          </div>
        </div>
        <div className="sl-summary-card">
          <div className="sl-summary-icon sl-summary-icon--resolved">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="sl-summary-info">
            <span className="sl-summary-value">
              {mockHistory.filter(h => h.status === 'Resolved').length}
            </span>
            <span className="sl-summary-label">Resolved</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sl-history-filter">
        <div className="sl-filter-tabs">
          {['all', 'ongoing', 'resolved'].map((status) => (
            <button
              key={status}
              className={`sl-filter-tab ${filterStatus === status ? 'sl-filter-tab--active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="sl-history-list">
        {filtered.map((record, index) => (
          <div
            key={record.id}
            className={`sl-history-card ${expandedId === record.id ? 'sl-history-card--expanded' : ''}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className="sl-history-card-header" onClick={() => toggleExpand(record.id)}>
              <div className="sl-history-card-left">
                <span className={`sl-severity-dot ${getSeverityClass(record.severity)}`}></span>
                <div className="sl-history-card-info">
                  <h4 className="sl-history-disease">{record.disease}</h4>
                  <span className="sl-history-date">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                    {' '}&middot; {record.doctor}
                  </span>
                </div>
              </div>
              <div className="sl-history-card-right">
                <span className={`sl-status-badge ${getStatusClass(record.status)}`}>
                  {record.status}
                </span>
                <svg
                  className={`sl-expand-icon ${expandedId === record.id ? 'sl-expand-icon--open' : ''}`}
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {expandedId === record.id && (
              <div className="sl-history-card-body">
                <p className="sl-history-summary">{record.summary}</p>
                <div className="sl-history-vitals">
                  <div className="sl-vital-item">
                    <span className="sl-vital-label">Blood Pressure</span>
                    <span className="sl-vital-value">{record.vitals.bp}</span>
                  </div>
                  <div className="sl-vital-item">
                    <span className="sl-vital-label">Blood Sugar</span>
                    <span className="sl-vital-value">{record.vitals.sugar}</span>
                  </div>
                  <div className="sl-vital-item">
                    <span className="sl-vital-label">Weight</span>
                    <span className="sl-vital-value">{record.vitals.weight}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="sl-history-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <p>No records found for this filter.</p>
        </div>
      )}
    </div>
  );
}

export default PreviousHistory;
