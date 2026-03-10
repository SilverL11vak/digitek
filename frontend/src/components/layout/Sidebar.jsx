import { Link, useLocation } from 'react-router-dom';

function Item({ to, label, badge, groupActive }) {
  const location = useLocation();
  const active = groupActive || location.pathname === to;
  return (
    <Link to={to} className={`sidebar-item ${active ? 'active' : ''}`}>
      <span>{label}</span>
      {badge ? <span className="badge">{badge}</span> : null}
    </Link>
  );
}

export default function Sidebar({ mode }) {
  const isAdmin = mode === 'admin';

  return (
    <aside className="sidebar" aria-label="Main sidebar">
      <div style={{ fontWeight: 600, margin: '4px 8px 12px' }}>Menu</div>

      {isAdmin ? (
        <>
          <Item to="/admin" label="Dashboard" badge={3} groupActive />
          <Item to="/admin" label="Statistics" />
          <Item to="/admin" label="Orders" />
          <Item to="/admin" label="Priority List" />
          <Item to="/admin" label="Active Projects" />

          <div className="sidebar-section-title">My team</div>
          <Item to="/admin" label="Users" />
          <Item to="/admin" label="Tickets" badge={2} />
          <Item to="/admin" label="Clients" />
          <Item to="/admin" label="Employees" />

          <div className="sidebar-section-title">Settings</div>
          <Item to="/admin" label="Settings" />
          <Item to="/admin" label="Archive" />

          <div className="sidebar-section-title">Components</div>
          <Item to="/" label="Design" badge={4} />
          <Item to="/" label="AI Studio" />
          <Item to="/" label="Pictures" />
          <Item to="/" label="Text" />
        </>
      ) : (
        <>
          <Item to="/" label="Dashboard" badge={3} groupActive />
          <Item to="/marketplace" label="Marketplace" />
          <Item to="/" label="My Projects" />
          <div className="sidebar-section-title">Components</div>
          <Item to="/" label="Design" badge={4} />
          <Item to="/" label="AI Studio" />
          <Item to="/" label="Pictures" />
          <Item to="/" label="Text" />
        </>
      )}
    </aside>
  );
}

