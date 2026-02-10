'use client';

import { useState } from 'react';
import './DetectNew.css';

function DetectNew() {
  const [disease, setDisease] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock report data
  const mockReport = {
    disease: disease || 'Hypertension',
    riskLevel: 'Moderate',
    confidence: 78,
    recommendations: [
      'Reduce sodium intake to less than 2,300mg/day',
      'Regular aerobic exercise for 30 minutes, 5 times a week',
      'Monitor blood pressure twice daily',
      'Reduce stress through meditation or yoga',
      'Follow up with cardiologist in 4 weeks',
    ],
    medications: [
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
    ],
    vitals: {
      bloodPressure: { current: 145, target: 120, unit: 'mmHg (systolic)' },
      heartRate: { current: 82, target: 72, unit: 'bpm' },
      cholesterol: { current: 220, target: 200, unit: 'mg/dL' },
    },
    monthlyTrend: [
      { month: 'Jul', value: 155 },
      { month: 'Aug', value: 150 },
      { month: 'Sep', value: 148 },
      { month: 'Oct', value: 145 },
      { month: 'Nov', value: 140 },
      { month: 'Dec', value: 138 },
    ],
  };

  const handleDetect = (e) => {
    e.preventDefault();
    if (!disease.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowReport(true);
    }, 1500);
  };

  const handleReset = () => {
    setDisease('');
    setSymptoms('');
    setShowReport(false);
  };

  // Simple bar chart renderer
  const maxTrendValue = Math.max(...mockReport.monthlyTrend.map(t => t.value));

  // Circular progress helper
  const getCircleDash = (percent) => {
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (percent / 100) * circumference;
    return { circumference, offset };
  };

  return (
    <div className="sl-detect">
      {/* Input Section */}
      {!showReport && (
        <div className="sl-detect-input-section">
          <div className="sl-detect-input-card">
            <div className="sl-detect-input-header">
              <div className="sl-detect-input-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <h2 className="sl-detect-title">New Detection</h2>
                <p className="sl-detect-subtitle">Enter a disease or condition to generate a comprehensive health report</p>
              </div>
            </div>

            <form className="sl-detect-form" onSubmit={handleDetect}>
              <div className="sl-detect-field">
                <label className="sl-detect-label">Disease / Condition</label>
                <div className="sl-detect-input-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    className="sl-detect-input"
                    placeholder="e.g., Hypertension, Diabetes, Asthma"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                  />
                </div>
              </div>

              <div className="sl-detect-field">
                <label className="sl-detect-label">Symptoms (optional)</label>
                <textarea
                  className="sl-detect-textarea"
                  placeholder="Describe any symptoms you are experiencing..."
                  rows="4"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="sl-detect-submit"
                disabled={!disease.trim() || isLoading}
              >
                {isLoading ? (
                  <span className="sl-detect-loading">
                    <span className="sl-spinner"></span>
                    Analyzing...
                  </span>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    Generate Report
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Select */}
          <div className="sl-detect-quick">
            <span className="sl-detect-quick-label">Quick detect:</span>
            <div className="sl-detect-quick-tags">
              {['Hypertension', 'Type 2 Diabetes', 'Asthma', 'Anemia', 'Migraine'].map((d) => (
                <button
                  key={d}
                  className="sl-detect-quick-tag"
                  onClick={() => setDisease(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Report Section */}
      {showReport && (
        <div className="sl-report">
          {/* Report Header */}
          <div className="sl-report-header">
            <div className="sl-report-header-left">
              <h2 className="sl-report-title">Health Report</h2>
              <p className="sl-report-disease">{mockReport.disease}</p>
            </div>
            <div className="sl-report-header-right">
              <button className="sl-report-reset" onClick={handleReset}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                New Detection
              </button>
            </div>
          </div>

          {/* Risk & Confidence */}
          <div className="sl-report-metrics">
            <div className="sl-metric-card">
              <span className="sl-metric-label">Risk Level</span>
              <div className={`sl-risk-badge sl-risk--${mockReport.riskLevel.toLowerCase()}`}>
                {mockReport.riskLevel}
              </div>
            </div>
            <div className="sl-metric-card">
              <span className="sl-metric-label">Confidence Score</span>
              <div className="sl-confidence-ring">
                <svg width="96" height="96" viewBox="0 0 96 96">
                  <circle
                    cx="48" cy="48" r="40"
                    fill="none"
                    stroke="var(--sl-gray-200)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="48" cy="48" r="40"
                    fill="none"
                    stroke="var(--sl-primary)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={getCircleDash(mockReport.confidence).circumference}
                    strokeDashoffset={getCircleDash(mockReport.confidence).offset}
                    transform="rotate(-90 48 48)"
                    className="sl-confidence-circle"
                  />
                </svg>
                <span className="sl-confidence-value">{mockReport.confidence}%</span>
              </div>
            </div>
            <div className="sl-metric-card">
              <span className="sl-metric-label">Report Date</span>
              <span className="sl-metric-date">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Vitals Comparison */}
          <div className="sl-report-section">
            <h3 className="sl-report-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Vitals Overview
            </h3>
            <div className="sl-vitals-grid">
              {Object.entries(mockReport.vitals).map(([key, val]) => {
                const percent = Math.min((val.current / (val.target * 1.5)) * 100, 100);
                const isHigh = val.current > val.target;
                return (
                  <div key={key} className="sl-vital-card">
                    <div className="sl-vital-card-header">
                      <span className="sl-vital-card-name">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`sl-vital-status ${isHigh ? 'sl-vital-status--high' : 'sl-vital-status--normal'}`}>
                        {isHigh ? 'Above Target' : 'Normal'}
                      </span>
                    </div>
                    <div className="sl-vital-bar-container">
                      <div
                        className={`sl-vital-bar ${isHigh ? 'sl-vital-bar--high' : 'sl-vital-bar--normal'}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                      <div
                        className="sl-vital-target-line"
                        style={{ left: `${(val.target / (val.target * 1.5)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="sl-vital-values">
                      <span>Current: <strong>{val.current}</strong></span>
                      <span>Target: <strong>{val.target}</strong></span>
                      <span className="sl-vital-unit">{val.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trend Chart */}
          <div className="sl-report-section">
            <h3 className="sl-report-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              Monthly Trend (Systolic BP)
            </h3>
            <div className="sl-chart">
              <div className="sl-chart-bars">
                {mockReport.monthlyTrend.map((item, i) => (
                  <div key={i} className="sl-chart-bar-group">
                    <div className="sl-chart-bar-wrapper">
                      <div
                        className="sl-chart-bar"
                        style={{ height: `${(item.value / maxTrendValue) * 100}%` }}
                      >
                        <span className="sl-chart-bar-tooltip">{item.value}</span>
                      </div>
                    </div>
                    <span className="sl-chart-bar-label">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="sl-report-section">
            <h3 className="sl-report-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Recommendations
            </h3>
            <ul className="sl-recommendations">
              {mockReport.recommendations.map((rec, i) => (
                <li key={i} className="sl-recommendation-item" style={{ animationDelay: `${i * 0.08}s` }}>
                  <span className="sl-recommendation-num">{i + 1}</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medications */}
          <div className="sl-report-section">
            <h3 className="sl-report-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              Prescribed Medications
            </h3>
            <div className="sl-medications">
              {mockReport.medications.map((med, i) => (
                <div key={i} className="sl-medication-card">
                  <div className="sl-medication-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                  <div className="sl-medication-info">
                    <span className="sl-medication-name">{med.name}</span>
                    <span className="sl-medication-detail">{med.dosage} &middot; {med.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Print / Download */}
          <div className="sl-report-actions">
            <button className="sl-btn-outline" onClick={() => window.print()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print Report
            </button>
            <button className="sl-btn-primary-detect">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetectNew;
