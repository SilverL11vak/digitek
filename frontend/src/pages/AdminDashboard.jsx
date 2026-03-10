import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import api from '../utils/apiClient';

const socketBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')
    ? 'https://digitek.onrender.com'
    : '/');

const socket = io(socketBaseUrl, { path: '/socket.io' });

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/admin/stats/overview');
      setStats(res.data);
      setActivities(res.data.activities || []);
    };
    load();
  }, []);

  useEffect(() => {
    socket.on('activity:new', (activity) => {
      setActivities((prev) => [activity, ...prev].slice(0, 30));
    });
    return () => {
      socket.off('activity:new');
    };
  }, []);

  return (
    <div className="app-shell">
      <Sidebar mode="admin" />
      <div className="main-content">
        <TopBar />
        <div className="workspace">
          <div className="panel" style={{ gridColumn: '1 / -1' }}>
            <input
              className="search-input"
              placeholder="Type to search..."
              aria-label="Search in admin dashboard"
            />
            <div style={{ marginTop: 12, display: 'grid', gap: 12, gridTemplateColumns: '2fr 3fr' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Income · Weekly report</div>
                <div style={{ fontSize: 26, fontWeight: 600, marginTop: 4 }}>
                  ${stats?.income?.toFixed(2) ?? '15468'}
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 12,
                      padding: '2px 8px',
                      borderRadius: 999,
                      background: 'rgba(34,197,94,0.16)',
                      color: '#4ade80'
                    }}
                  >
                    +4.2%
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                  This week&apos;s statistics compared to last week.
                </div>
                <div
                  aria-label="Weekly bar chart placeholder"
                  style={{
                    marginTop: 12,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                    gap: 4,
                    height: 90,
                    alignItems: 'flex-end'
                  }}
                >
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <div key={day} style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af' }}>
                      <div
                        style={{
                          margin: '0 auto 4px',
                          width: 12,
                          borderRadius: 999,
                          background: idx === 4 ? '#22c55e' : '#1f2937',
                          height: idx === 4 ? 70 : 40
                        }}
                      />
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="metrics-row">
                  <div className="metric-card">
                    <div className="metric-title">Revenue</div>
                    <div className="metric-value">€15 545.69</div>
                    <div className="metric-pill success">↑ Stable</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-title">Profit</div>
                    <div className="metric-value">€12 256.34</div>
                    <div className="metric-pill">★ Healthy</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-title">Expenses</div>
                    <div className="metric-value">€1 974.19</div>
                    <div className="metric-pill danger">● Under control</div>
                  </div>
                </div>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 500 }}>Last activity</div>
                <div className="timeline" aria-label="Real-time activity feed">
                  {activities.map((a) => (
                    <div key={a._id} className="timeline-item">
                      <div className="timeline-dot" />
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 12 }}>{a.type}</div>
                        <div style={{ fontSize: 12, color: '#e5e7eb' }}>{a.message}</div>
                      </div>
                      <div style={{ fontSize: 11, color: '#9ca3af' }}>
                        {new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>No activity recorded yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="panel" style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Orders</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="pill-button">
                  Status: All
                </button>
                <button type="button" className="topbar-btn topbar-primary">
                  + New quote
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input
                className="search-input"
                placeholder="Search by ID, name or date..."
                aria-label="Search orders"
              />
            </div>
            <div style={{ marginTop: 10, overflowX: 'auto' }}>
              <table className="table" aria-label="Orders table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((id) => (
                    <tr key={id}>
                      <td>
                        <input type="checkbox" aria-label={`Select order ${id}`} /> #{189 - id}
                      </td>
                      <td>€{3000 - id * 120}</td>
                      <td>09 May 2022</td>
                      <td>
                        <div className="table-actions">
                          <button type="button" className="pill-button">
                            Email
                          </button>
                          <button type="button" className="pill-button">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

