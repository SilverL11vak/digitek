import { Stage, Layer, Circle, Rect, Star, Group, Text } from 'react-konva';
import { useDesign } from '../../state/DesignContext';

export default function CanvasStage() {
  const { shapes, updateShape, stageRef } = useDesign();

  const handleDragEnd = (id, e) => {
    updateShape(id, { x: e.target.x(), y: e.target.y() });
  };

  return (
    <div className="canvas-frame" aria-label="Sticker canvas">
      <Stage
        ref={stageRef}
        width={540}
        height={540}
        style={{ borderRadius: 24, background: '#111827' }}
      >
        <Layer>
          {/* Background circle */}
          <Circle x={270} y={270} radius={240} fill="#030712" stroke="#f97316" strokeWidth={18} />
          <Text
            text="HIBANA WELDING COMPANY"
            x={70}
            y={40}
            width={400}
            align="center"
            fill="#fef3c7"
            fontFamily="system-ui"
            fontStyle="bold"
          />
          {shapes.map((shape) => (
            <Group
              key={shape.id}
              draggable
              x={shape.x}
              y={shape.y}
              rotation={shape.rotation}
              onDragEnd={(e) => handleDragEnd(shape.id, e)}
            >
              {shape.type === 'circle' && (
                <Circle radius={shape.radius} fill={shape.fill} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />
              )}
              {shape.type === 'rect' && (
                <Rect
                  width={shape.width}
                  height={shape.height}
                  cornerRadius={shape.cornerRadius}
                  fill={shape.fill}
                  stroke={shape.stroke}
                  strokeWidth={shape.strokeWidth}
                />
              )}
              {shape.type === 'star' && (
                <Star
                  numPoints={shape.numPoints}
                  innerRadius={shape.innerRadius}
                  outerRadius={shape.outerRadius}
                  fill={shape.fill}
                  stroke={shape.stroke}
                  strokeWidth={shape.strokeWidth}
                />
              )}
              {['heart', 'dog', 'arrow', 'angle'].includes(shape.type) && (
                <Rect
                  width={shape.width}
                  height={shape.height}
                  cornerRadius={30}
                  fill={shape.fill}
                  stroke={shape.stroke}
                  strokeWidth={shape.strokeWidth}
                />
              )}
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

