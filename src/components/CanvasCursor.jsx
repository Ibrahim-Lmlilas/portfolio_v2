import React from 'react';
import useCanvasCursor from '../hooks/useCanvasCursor';

const CanvasCursor = ({ containerId }) => {
  const canvasId = `canvas-${containerId}`;
  useCanvasCursor(containerId, canvasId);
  return (
    <canvas 
      className="pointer-events-none absolute inset-0 z-[5]" 
      id={canvasId}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
};

export default CanvasCursor;
