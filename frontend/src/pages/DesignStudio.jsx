import { useCallback } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import Toolbar from '../components/design/Toolbar';
import CanvasStage from '../components/design/CanvasStage';
import LayersPanel from '../components/design/LayersPanel';
import { useDesign } from '../state/DesignContext';
import api from '../utils/apiClient';

export default function DesignStudio() {
  const { stageRef, shapes } = useDesign();

  const handleExport = useCallback(async () => {
    if (!stageRef.current) return;
    const dataUrl = stageRef.current.toDataURL({ pixelRatio: 3 });
    // Optional upload to backend/Cloudinary
    try {
      const res = await api.post('/uploads/image', { dataUrl });
      // eslint-disable-next-line no-alert
      alert(`Exported & uploaded: ${res.data.url}`);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Exported locally. Right-click to save the image.');
      // Fallback: open in new tab
      const win = window.open();
      win.document.write(`<img src="${dataUrl}" alt="Exported sticker" />`);
    }
  }, [stageRef]);

  const handleSave = useCallback(async () => {
    if (!stageRef.current) return;
    const stageJson = stageRef.current.toJSON();
    try {
      await api.post('/designs', {
        title: 'My Sticker',
        canvasJson: JSON.parse(stageJson),
        categories: ['Stickers', 'Rounded']
      });
      // eslint-disable-next-line no-alert
      alert('Design saved to your library.');
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to save design. Ensure you are logged in.');
    }
  }, [stageRef]);

  return (
    <div className="app-shell">
      <Sidebar mode="studio" />
      <div className="main-content">
        <TopBar />
        <div className="workspace" aria-label="Sticker design workspace">
          {/* Left panel: marketplace thumbnails */}
          <div className="panel" aria-label="Local marketplace">
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Stickers</div>
            <input
              className="search-input"
              placeholder="Search stickers from 1400+ variants..."
              aria-label="Search stickers"
            />
            <div style={{ marginTop: 10, fontSize: 12, color: '#9ca3af' }}>Popular collections</div>
            <div
              style={{
                marginTop: 6,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 8
              }}
            >
              {['Hibana Welding', 'Weld & Roll', 'Life is Good', 'Larana Cake', 'Fresh Bakery'].map((title) => (
                <button
                  key={title}
                  type="button"
                  className="pill-button"
                  style={{ textAlign: 'left', height: 64 }}
                  onClick={() => window.alert(`In a full app this would drag "${title}" into the canvas.`)}
                >
                  {title}
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Stickers / Rounded</div>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="primary-btn"
              style={{ marginTop: 12 }}
              onClick={() => window.alert('Upload flow placeholder')}
            >
              Upload your own custom sticker
            </button>
          </div>

          {/* Center: canvas */}
          <div className="canvas-shell" aria-label="Canvas column">
            <Toolbar onExport={handleExport} />
            <CanvasStage />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af' }}>
              <span>{shapes.length} layers</span>
              <span>1 / 1 · 100% · 54 mm</span>
            </div>
            <button type="button" className="secondary-btn" onClick={handleSave}>
              Save Project
            </button>
          </div>

          {/* Right: layers and properties */}
          <LayersPanel />
        </div>
      </div>
    </div>
  );
}

