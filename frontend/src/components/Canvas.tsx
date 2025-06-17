import React, { useEffect, useRef, useState } from 'react';

export type ToolType = 'circle' | 'square' | 'triangle';

export interface Shape {
  id: number;
  type: ToolType;
  x: number;
  y: number;
}

interface CanvasProps {
  selectedTool: ToolType;
  shapes: Shape[];
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
}

const Canvas: React.FC<CanvasProps> = ({ selectedTool, shapes, setShapes }) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [draggingShapeId, setDraggingShapeId] = useState<number | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Handle dragging inside canvas
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingShapeId === null || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - offsetRef.current.x;
      const y = e.clientY - rect.top - offsetRef.current.y;

      setShapes(prev =>
        prev.map(shape =>
          shape.id === draggingShapeId ? { ...shape, x, y } : shape
        )
      );
    };

    const handleMouseUp = () => {
      setDraggingShapeId(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingShapeId, setShapes]);

  const handleShapeMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    shape: Shape
  ) => {
    e.stopPropagation();
    const rect = canvasRef.current!.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left - shape.x,
      y: e.clientY - rect.top - shape.y
    };
    setDraggingShapeId(shape.id);
  };

  const handleShapeDoubleClick = (shapeId: number) => {
    setShapes(prev => prev.filter(shape => shape.id !== shapeId));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allow dropping
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const toolType = e.dataTransfer.getData('toolType') as ToolType;
    if (!toolType) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newShape: Shape = {
      id: Date.now(),
      type: toolType,
      x,
      y
    };

    setShapes([...shapes, newShape]);
  };

  const renderShape = (shape: Shape) => {
    const style: React.CSSProperties = {
      position: 'absolute',
      left: shape.x,
      top: shape.y,
      width: 50,
      height: 50,
      cursor: 'grab'
    };

    if (shape.type === 'circle') {
      return (
        <div
          key={shape.id}
          style={{ ...style, borderRadius: '50%', backgroundColor: 'red' }}
          onMouseDown={(e) => handleShapeMouseDown(e, shape)}
          onDoubleClick={() => handleShapeDoubleClick(shape.id)}
        />
      );
    }

    if (shape.type === 'square') {
      return (
        <div
          key={shape.id}
          style={{ ...style, backgroundColor: 'green' }}
          onMouseDown={(e) => handleShapeMouseDown(e, shape)}
          onDoubleClick={() => handleShapeDoubleClick(shape.id)}
        />
      );
    }

    if (shape.type === 'triangle') {
      return (
        <div
          key={shape.id}
          onMouseDown={(e) => handleShapeMouseDown(e, shape)}
          onDoubleClick={() => handleShapeDoubleClick(shape.id)}
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: 0,
            height: 0,
            cursor: 'grab',
            borderLeft: '25px solid transparent',
            borderRight: '25px solid transparent',
            borderBottom: '50px solid blue'
          }}
        />
      );
    }

    return null;
  };

  return (
    <div
      ref={canvasRef}
      style={styles.canvas}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {shapes.map(renderShape)}
    </div>
  );
};

const styles = {
  canvas: {
    flex: 1,
    position: 'relative' as const,
    backgroundColor: '#fff',
    border: '2px dashed gray',
    margin: '20px',
    height: '80vh',
    overflow: 'hidden'
  }
};

export default Canvas;
		
