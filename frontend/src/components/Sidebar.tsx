import React from 'react';

type ToolType = 'circle' | 'square' | 'triangle';

interface SidebarProps {
  selectedTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTool, onSelectTool }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, tool: ToolType) => {
    event.dataTransfer.setData('toolType', tool);
  };

  const renderShapeIcon = (tool: ToolType) => {
    const size = 40;
    const commonStyle: React.CSSProperties = {
      width: size,
      height: size,
      marginBottom: '10px',
      cursor: 'grab',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: selectedTool === tool ? '2px solid #007bff' : '1px solid #ccc',
      backgroundColor: 'transparent'
    };

    if (tool === 'circle') {
      return (
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, tool)}
          onClick={() => onSelectTool(tool)}
          style={{
            ...commonStyle,
            borderRadius: '50%',
            backgroundColor: 'red'
          }}
        />
      );
    }

    if (tool === 'square') {
      return (
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, tool)}
          onClick={() => onSelectTool(tool)}
          style={{
            ...commonStyle,
            backgroundColor: 'green'
          }}
        />
      );
    }

    if (tool === 'triangle') {
      return (
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, tool)}
          onClick={() => onSelectTool(tool)}
          style={{
            ...commonStyle,
            border: selectedTool === tool ? '2px solid #007bff' : '1px solid transparent',
            backgroundColor: 'transparent'
          }}
        >
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderBottom: '35px solid blue'
          }} />
        </div>
      );
    }

    return null;
  };

  return (
    <aside style={styles.sidebar}>
      {['circle', 'square', 'triangle'].map((tool) =>
        <React.Fragment key={tool}>
          {renderShapeIcon(tool as ToolType)}
        </React.Fragment>
      )}
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '100px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderLeft: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center'
  }
};

export default Sidebar;

