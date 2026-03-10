import { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import api from '../utils/apiClient';

export default function Marketplace() {
  const [designs, setDesigns] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await api.get('/designs', { params: { q: query || undefined } });
      setDesigns(res.data);
      setLoading(false);
    };
    load();
  }, [query]);

  return (
    <div className="app-shell">
      <Sidebar mode="studio" />
      <div className="main-content">
        <TopBar />
        <div className="workspace">
          <div className="panel" style={{ gridColumn: '1 / -1' }}>
            <input
              className="search-input"
              placeholder="Search stickers from 1400+ variants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {loading ? (
              <div style={{ marginTop: 12, fontSize: 13 }}>Loading...</div>
            ) : (
              <div
                style={{
                  marginTop: 12,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: 10
                }}
              >
                {designs.map((d) => (
                  <div
                    key={d._id}
                    style={{
                      borderRadius: 14,
                      border: '1px solid #374151',
                      padding: 10,
                      background: '#020617'
                    }}
                  >
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{d.title}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{d.description}</div>
                    <div style={{ fontSize: 12, marginTop: 6 }}>
                      <span className="tag-pill">Stickers / Rounded</span>
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>${d.price?.toFixed(2) ?? '4.99'}</span>
                      <button
                        type="button"
                        className="pill-button"
                        onClick={() =>
                          window.alert(
                            'In a full build this adds the design to the cart and opens Stripe Checkout.'
                          )
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
                {!loading && designs.length === 0 && (
                  <div style={{ fontSize: 13, color: '#9ca3af' }}>No designs match your search yet.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

