import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext';

export default function TopBar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const title =
    location.pathname === '/admin'
      ? 'Menu / Statistics'
      : location.pathname === '/marketplace'
      ? 'Stickers / Marketplace'
      : 'Stickers / Project1';

  return (
    <header className="topbar" aria-label="Top navigation bar">
      <div className="topbar-left">
        <span className="topbar-title">Project1</span>
        <span style={{ fontSize: 13, color: '#9ca3af' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button type="button" className="topbar-btn">
          Premium
        </button>
        <button type="button" className="topbar-btn">
          Save
        </button>
        <button type="button" className="topbar-btn">
          Share
        </button>
        <button type="button" className="topbar-btn">
          100%
        </button>
        <button type="button" className="topbar-btn topbar-primary">
          Print
        </button>
        <nav aria-label="Primary pages" style={{ marginLeft: 16, display: 'flex', gap: 8 }}>
          <Link to="/" className="link">
            Studio
          </Link>
          <Link to="/marketplace" className="link">
            Marketplace
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="link">
              Admin
            </Link>
          )}
        </nav>
        {user ? (
          <>
            <span style={{ fontSize: 13, color: '#9ca3af', marginLeft: 8 }}>{user.name}</span>
            <button type="button" className="topbar-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="link" style={{ marginLeft: 8 }}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

