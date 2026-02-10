'use client';

import "./Sidebar.css";

function Sidebar({ activePage, setActivePage, collapsed, setCollapsed, onLogout }) {
  const navItems = [
    {
      id: "profile",
      label: "Profile",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: "history",
      label: "Previous History",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: "detect",
      label: "Detect New",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
  ];

  return (
    <aside className={`sl-sidebar ${collapsed ? "sl-sidebar--collapsed" : ""}`}>
      <div className="sl-sidebar-header">
        <div className="sl-sidebar-logo">
          <div className="sl-sidebar-logo-icon">
            <button
                className="sl-sidebar-logo-icon"
                onClick={() => collapsed && setCollapsed(false)}
                aria-label="Open sidebar"
              >
                <svg
                  width="22"
                  height="22"
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
              </button>

          </div>
          {!collapsed && <span className="sl-sidebar-logo-text">SimuLife</span>}
        </div>
        <button
          className="sl-sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Collapse sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {collapsed ? (
              <polyline points="9 18 15 12 9 6" />
            ) : (
              <polyline points="15 18 9 12 15 6" />
            )}
          </svg>
        </button>
      </div>

      <nav className="sl-sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sl-sidebar-nav-item ${activePage === item.id ? "sl-sidebar-nav-item--active" : ""}`}
            onClick={() => setActivePage(item.id)}
            title={collapsed ? item.label : undefined}
          >
            <span className="sl-sidebar-nav-icon">{item.icon}</span>
            {!collapsed && <span className="sl-sidebar-nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sl-sidebar-footer">
        <div className="sl-sidebar-user">
          <div className="sl-sidebar-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          {!collapsed && (
            <div className="sl-sidebar-user-info">
              <span className="sl-sidebar-user-name">John Doe</span>
              <span className="sl-sidebar-user-role">johndoe@gmail.com</span>
            </div>
          )}
        </div>
        {onLogout && (
          <button
            className="sl-sidebar-logout-btn"
            onClick={onLogout}
            title={collapsed ? "Logout" : undefined}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {!collapsed && <span>Logout</span>}
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
