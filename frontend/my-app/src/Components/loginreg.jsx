'use client';

import { useState } from "react";
import "./LoginReg.css";
import axios from "axios";

/* ── Inline SVG icons ── */
const HeartPulseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <path d="m2 2 20 20" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

const LockKeyholeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="16" r="1" />
    <rect x="3" y="10" width="18" height="12" rx="2" />
    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
  </svg>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);


export default function LoginReg({ onSuccess }) {



  // ONLY DECLARE THESE ONCE
  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const isLogin = mode === "login";

  // Updates the form state when user types
  let handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handles both Login and Signup
  const handlesubmit = (e) => {
    e.preventDefault();

    // Port 9000 is where your node server is running
    const endpoint = isLogin ? "login" : "add";
    
    axios.post(`http://localhost:9000/${endpoint}`, form)
      .then((res) => {
        alert(isLogin ? "Welcome Back!" : "Account Created Successfully!");
        // If login is successful, we pass the user email to the parent
        if (onSuccess) onSuccess(form.email); 
      })
      .catch((err) => {
        console.error("Backend Error:", err);
        alert(isLogin ? "Invalid Credentials" : "User already exists or Server Error");
      });
  };

  const switchMode = (m) => {
    setMode(m);
    // Resetting form when switching tabs
    setForm({ firstName: "", lastName: "", email: "", password: "" });
  };


  // ... (Rest of your UI code remains same)


  return (
    <div className="sl-page">
      <div className="sl-card">
        {/* ── LEFT BRANDING ── */}
        <div className="sl-brand">
          <div className="sl-brand-logo">
            <div className="sl-brand-logo-icon">
              <HeartPulseIcon />
            </div>
            <span>SimuLife</span>
          </div>

          <h1 className="sl-brand-headline">
            Simulation-First
            <br />
            Precision Medicine
          </h1>
          <p className="sl-brand-sub">
            Create bio-digital twins that predict treatment outcomes before
            prescription. Safer decisions, personalized care.
          </p>

          <div className="sl-trust">
            <span>Trusted by professionals</span>
            <div className="sl-trust-row">
              <div className="sl-trust-badge">
                <CheckCircleIcon />
                HIPAA Compliant
              </div>
              <div className="sl-trust-badge">
                <LockKeyholeIcon />
                256-bit Encrypted
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM ── */}
        <div className="sl-form-side">
          <div className="sl-form-container">
            {/* mobile logo */}
            <div className="sl-mobile-logo">
              <div className="sl-mobile-logo-icon">
                <HeartPulseIcon />
              </div>
              <span>SimuLife</span>
            </div>

            {/* tabs */}
            <div className="sl-tabs">
              <button
                type="button"
                className={`sl-tab ${isLogin ? "active" : ""}`}
                onClick={() => switchMode("login")}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`sl-tab ${!isLogin ? "active" : ""}`}
                onClick={() => switchMode("signup")}
              >
                Sign Up
              </button>
            </div>

            <h2 className="sl-form-title">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="sl-form-subtitle">
              {isLogin
                ? "Enter your credentials to access the platform"
                : "Start simulating treatment outcomes today"}
            </p>

            {/* Google */}
            <button
              type="button"
              className="sl-google-btn"
              onClick={() => { if (onSuccess) onSuccess(); }}
            >
              <GoogleLogo />
              Continue with Google
            </button>

            <div className="sl-divider">
              <span>or</span>
            </div>

            {/* SignUp */}
            <form onSubmit={handlesubmit}>
              <div className="sl-form-body" key={mode}>
                {/* name fields (signup only) */}
                {!isLogin && (
                  <div className="sl-name-row">
                    <div className="sl-field">
                      <label className="sl-label" htmlFor="firstName">
                        First Name
                      </label>
                      <div className="sl-input-wrapper">
                        <UserIcon />
                        <input
                          id="firstName"
                          name="firstName"
                          className="sl-input"
                          type="text"
                          placeholder="John"
                          value={form.firstName}
                          onChange={handle}
                          required
                        />
                      </div>
                    </div>
                    <div className="sl-field">
                      <label className="sl-label" htmlFor="lastName">
                        Last Name
                      </label>
                      <div className="sl-input-wrapper">
                        <UserIcon />
                        <input
                          id="lastName"
                          name="lastName"
                          className="sl-input"
                          type="text"
                          placeholder="Doe"
                          value={form.lastName}
                          onChange={handle}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* login */}
                {/* email */}
                <div className="sl-field">
                  <label className="sl-label" htmlFor="email">
                    Email Address
                  </label>
                  <div className="sl-input-wrapper">
                    <MailIcon />
                    <input
                      id="email"
                      name="email"
                      className="sl-input"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handle}
                      required
                    />
                  </div>
                </div>

                {/* password */}
                <div className="sl-field">
                  <label className="sl-label" htmlFor="password">
                    Password
                  </label>
                  <div className="sl-input-wrapper">
                    <LockIcon />
                    <input
                      id="password"
                      name="password"
                      className="sl-input"
                      type={showPw ? "text" : "password"}
                      placeholder={
                        isLogin ? "Enter your password" : "Create a password"
                      }
                      value={form.password}
                      onChange={handle}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="sl-toggle-pw"
                      onClick={handle}
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="sl-submit">
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </div>
            </form>

            {/* footer switch */}
            <p className="sl-footer">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => switchMode(isLogin ? "signup" : "login")}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>

            <p className="sl-terms">
              By continuing you agree to our <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
