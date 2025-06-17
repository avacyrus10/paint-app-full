import React from 'react';
import { Shape, ToolType } from './Canvas';

interface ShapeStatsBarProps {
  shapes: Shape[];
}

const ShapeStatsBar: React.FC<ShapeStatsBarProps> = ({ shapes }) => {
  const countByType = (type: ToolType) => {
    return shapes.filter(shape => shape.type === type).length;
  };

  const size = 40;

  const renderIcon = (tool: ToolType) => {
    const count = countByType(tool);

    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '0 10px'
    };

    const shapeStyle: React.CSSProperties = {
      width: size,
      height: size
    };

    let shapeElement: React.ReactElement | null = null;


    if (tool === 'circle') {
      shapeElement = (
        <div
          style={{
            ...shapeStyle,
            borderRadius: '50%',
            backgroundColor: 'red'
          }}
        />
      );
    } else if (tool === 'square') {
      shapeElement = (
        <div
          style={{
            ...shapeStyle,
            backgroundColor: 'green'
          }}
        />
      );
    } else if (tool === 'triangle') {
      shapeElement = (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid blue`
          }}
        />
      );
    }

    return (
      <div key={tool} style={wrapperStyle}>
        {shapeElement}
        <span>{count}</span>
      </div>
    );
  };

  return (
    <div style={styles.bar}>
      {(['circle', 'square', 'triangle'] as ToolType[]).map(renderIcon)}
    </div>
  );
};

const styles = {
  bar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80px',
    borderTop: '1px solid #ccc',
    backgroundColor: '#fafafa'
  }
};

export default ShapeStatsBar;

