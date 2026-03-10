import { useDesign } from '../../state/DesignContext';

export default function LayersPanel() {
  const { shapes } = useDesign();

  return (
    <div className="panel" aria-label="Layers and properties">
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Design</div>
      <div className="layers-grid">
        <div className="layers-row">
          <span>Dashboard</span>
          <span style={{ color: '#9ca3af' }}>54 mm</span>
        </div>
        <div style={{ borderTop: '1px solid #374151', margin: '4px 0 6px' }} />
        <div className="layers-row">
          <span>Background</span>
          <span>#303134 · 100%</span>
        </div>
        <div className="layers-row">
          <span>Global Style</span>
          <span>#F9E3BF · 100%</span>
        </div>
        <div className="layers-row">
          <span>Stroke</span>
          <span>#FC7B3E · 1.5px</span>
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 12, color: '#9ca3af' }}>Layers</div>
      <div
        style={{
          maxHeight: 200,
          overflowY: 'auto',
          marginTop: 4,
          borderRadius: 10,
          border: '1px solid #374151',
          padding: 6
        }}
      >
        {shapes.map((s) => (
          <div
            key={s.id}
            style={{
              padding: '4px 6px',
              borderRadius: 8,
              fontSize: 12,
              display: 'flex',
              justifyContent: 'space-between',
              color: '#e5e7eb'
            }}
          >
            <span>{s.type.toUpperCase()}</span>
            <span style={{ color: '#9ca3af' }}>
              X{s.x} · Y{s.y}
            </span>
          </div>
        ))}
        {shapes.length === 0 && (
          <div style={{ fontSize: 12, color: '#6b7280' }}>No layers yet. Add a shape to begin.</div>
        )}
      </div>
    </div>
  );
}

