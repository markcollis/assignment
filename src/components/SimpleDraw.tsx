import * as React from 'react';

import NumberInput from './NumberInput';
import SliderInput from './SliderInput';
import DrawingsToLoad from './DrawingsToLoad';

type Coordinate = {
  x: number;
  y: number;
}
export type SavedDrawing = {
  date: string;
  imageData: string;
}

// The SimpleDraw component is the top level component for Assignment 4
const SimpleDraw: React.FC = () => {
  const canvasRef = React.useRef(null);
  const [lastLocation, setLastLocation] = React.useState<Coordinate>({ x: null, y: null });
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [lineWidth, setLineWidth] = React.useState(3);
  const [savedDrawings, setSavedDrawings] = React.useState<SavedDrawing[]>(JSON.parse(localStorage.getItem('simpleDraw')) || []);
  const [showDrawingsToLoad, setShowDrawingsToLoad] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('simpleDraw', JSON.stringify(savedDrawings));
  });

  const drawCircle: (
    canvas: HTMLCanvasElement,
    centre: Coordinate,
    diameter: number
  ) => void = (canvas, centre, diameter) => {
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(centre.x, centre.y, diameter / 2, 0, 2 * Math.PI);
    context.fill();
  };

  const drawLine: (
    canvas: HTMLCanvasElement,
    from: Coordinate,
    to: Coordinate,
    width: number,
  ) => void = (canvas, from, to, width) => {
    const context = canvas.getContext('2d');
    context.beginPath();
    context.lineCap = 'round';
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.lineWidth = width;
    context.stroke();
  };

  // get current location in canvas coordinates
  const getCurrentLocation: (e: React.MouseEvent) => Coordinate = (e) => {
    const target = e.target as HTMLCanvasElement;
    const canvasBoundingRect = target.getBoundingClientRect();
    const scaleFactor = target.width / target.offsetWidth; // if resized through CSS
    const offsetX = (e.clientX - canvasBoundingRect.left) * scaleFactor;
    const offsetY = (e.clientY - canvasBoundingRect.top) * scaleFactor;
    const currentLocation = { x: offsetX, y: offsetY };
    return currentLocation;
  };

  // start drawing, paint a dot of the appropriate size if clicking without moving
  const handleMouseDown: (e: React.MouseEvent) => void = (e) => {
    setIsDrawing(true);
    const currentLocation = getCurrentLocation(e);
    drawCircle(canvasRef.current, currentLocation, lineWidth);
    setLastLocation(currentLocation);
  };

  // draw a line of the appropriate width from the previous position
  const handleMouseMove: (e: React.MouseEvent) => void = (e) => {
    if (isDrawing) {
      const currentLocation = getCurrentLocation(e);
      drawLine(canvasRef.current, lastLocation, currentLocation, lineWidth);
      setLastLocation(currentLocation);
    }
  };

  // stop drawing when mouse released or moved out of canvas area
  const handleMouseUpOrLeave: () => void = () => {
    setIsDrawing(false);
    setLastLocation({ x: null, y: null });
  };

  const handleClearDrawing: () => void = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveDrawing: () => void = () => {
    const dataUrl = canvasRef.current.toDataURL();
    const newSavedDrawings = savedDrawings.concat({
      date: new Date().toLocaleString(),
      imageData: dataUrl,
    });
    setSavedDrawings(newSavedDrawings);
  };

  const deleteSelectedDrawing: (selection: number) => void = (selection) => {
    const newSavedDrawings = savedDrawings.slice(0, selection)
      .concat(savedDrawings.slice(selection + 1));
    setSavedDrawings(newSavedDrawings);
  };

  const loadSelectedDrawing: (selection: number) => void = (selection) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (savedDrawings[selection]) {
      handleClearDrawing();
      const dataUrl = savedDrawings[selection].imageData;
      const retrievedImgData = new Image();
      retrievedImgData.addEventListener('load', () => context.drawImage(retrievedImgData, 0, 0));
      retrievedImgData.setAttribute('src', dataUrl);
    }
    setShowDrawingsToLoad(false);
  };

  const handleLoadDrawing: () => void = () => {
    setShowDrawingsToLoad(true);
  };

  return (
    <div className="simple-draw">
      <p>Let&apos;s draw some lines!</p>
      <div className="set-line-width">
        <p>Line width:</p>
        <NumberInput
          value={lineWidth}
          setValue={setLineWidth}
          minValue={1}
          maxValue={50}
        />
        <SliderInput
          value={lineWidth}
          setValue={setLineWidth}
          minValue={1}
          maxValue={50}
        />
      </div>
      <div className="manage-drawings">
        <button
          type="button"
          onClick={handleClearDrawing}
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleSaveDrawing}
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleLoadDrawing}
        >
          Load
        </button>
      </div>
      {(showDrawingsToLoad) ? (
        <DrawingsToLoad
          savedDrawings={savedDrawings}
          loadSelectedDrawing={loadSelectedDrawing}
          deleteSelectedDrawing={deleteSelectedDrawing}
          cancelDrawingsToLoad={(): void => setShowDrawingsToLoad(false)}
        />
      ) : ''}
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      />
    </div>
  );
};

export default SimpleDraw;
