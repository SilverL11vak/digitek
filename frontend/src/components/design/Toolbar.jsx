import { useDesign } from '../../state/DesignContext';

export default function Toolbar({ onExport }) {
  const { activeTool, setActiveTool, addShape } = useDesign();

  const toolButtons = [
    { id: 'artboard', label: 'Artboard' },
    { id: 'ai', label: 'AI Studio' },
    { id: 'shapes', label: 'Shapes' },
    { id: 'pictures', label: 'Pictures' },
    { id: 'text', label: 'Text' }
  ];

  return (
    <div className="canvas-toolbar" aria-label="Canvas tools toolbar">
      {toolButtons.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`pill-button ${activeTool === t.id ? 'active' : ''}`}
          onClick={() => setActiveTool(t.id)}
        >
          {t.label}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button type="button" className="pill-button" onClick={() => addShape('circle')}>
        + Circle
      </button>
      <button type="button" className="pill-button" onClick={() => addShape('star')}>
        + Star
      </button>
      <button type="button" className="pill-button" onClick={() => addShape('rect')}>
        + Rectangle
      </button>
      <button type="button" className="pill-button" onClick={() => addShape('dog')}>
        + Dog (placeholder)
      </button>
      <button type="button" className="pill-button" onClick={onExport}>
        Export PNG
      </button>
    </div>
  );
}

