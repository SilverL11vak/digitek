import React, { createContext, useContext, useRef, useState } from 'react';

const DesignContext = createContext(null);

export function DesignProvider({ children }) {
  const [activeTool, setActiveTool] = useState('artboard');
  const [shapes, setShapes] = useState([]);
  const stageRef = useRef(null);

  const addShape = (type) => {
    const id = `${type}-${Date.now()}`;
    const base = { id, x: 150, y: 150, rotation: 0, fill: '#f97316', stroke: '#000', strokeWidth: 2 };
    switch (type) {
      case 'circle':
        setShapes((prev) => [...prev, { ...base, type, radius: 80 }]);
        break;
      case 'rect':
        setShapes((prev) => [...prev, { ...base, type, width: 200, height: 120, cornerRadius: 20 }]);
        break;
      case 'star':
        setShapes((prev) => [...prev, { ...base, type, numPoints: 5, innerRadius: 40, outerRadius: 90 }]);
        break;
      case 'heart':
      case 'dog':
      case 'arrow':
      case 'angle':
        setShapes((prev) => [...prev, { ...base, type, width: 220, height: 140 }]);
        break;
      default:
        break;
    }
  };

  const updateShape = (id, props) => {
    setShapes((prev) => prev.map((s) => (s.id === id ? { ...s, ...props } : s)));
  };

  const value = {
    activeTool,
    setActiveTool,
    shapes,
    addShape,
    updateShape,
    stageRef
  };

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
}

export function useDesign() {
  return useContext(DesignContext);
}

