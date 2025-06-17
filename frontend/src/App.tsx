import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas, { Shape } from './components/Canvas';
import ShapeStatsBar from './components/ShapeStatsBar';

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<'circle' | 'square' | 'triangle'>('circle');
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [title, setTitle] = useState<string>('');

  const handleImport = (newShapes: Shape[]) => {
    setShapes(newShapes);
  };

  return (
    <div>
      <Header
        shapes={shapes}
        title={title}
        onTitleChange={setTitle}
        onImport={handleImport}
      />
      <div style={styles.main}>
        <Canvas
          selectedTool={selectedTool}
          shapes={shapes}
          setShapes={setShapes}
        />
        <Sidebar
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
        />
      </div>
      <ShapeStatsBar shapes={shapes} />
    </div>
  );
};

const styles = {
  main: {
    display: 'flex',
    height: 'calc(100vh - 140px)' 
  }
};

export default App;

