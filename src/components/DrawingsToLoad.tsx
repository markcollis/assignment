import * as React from 'react';

import { SavedDrawing } from './SimpleDraw';

interface DrawingsToLoadProps {
  savedDrawings: SavedDrawing[];
  loadSelectedDrawing: (selection: number) => void;
  deleteSelectedDrawing: (selection: number) => void;
  cancelDrawingsToLoad: () => void;
}

// The DrawingsToLoad component renders a list of saved drawings to select from or delete
const DrawingsToLoad: React.FC<DrawingsToLoadProps> = ({
  savedDrawings,
  loadSelectedDrawing,
  deleteSelectedDrawing,
  cancelDrawingsToLoad,
}) => {
  if (savedDrawings.length === 0) return <p>Sorry, no saved drawings found</p>;
  return (
    <div className="drawings-to-load">
      <div className="cancel">
        <button type="button" onClick={cancelDrawingsToLoad}>&times;</button>
      </div>
      <ul>
        {savedDrawings.map((savedDrawing, index) => {
          const { date, imageData } = savedDrawing;
          return (
            <li key={date}>
              <div>
                <span className="saved-date">{`saved: ${date}`}</span>
                <span className="load-buttons">
                  <button type="button" onClick={(): void => loadSelectedDrawing(index)}>Load</button>
                  <button type="button" onClick={(): void => deleteSelectedDrawing(index)}>Delete</button>
                </span>
              </div>
              <button
                className="image-button"
                type="button"
                onClick={(): void => loadSelectedDrawing(index)}
              >
                <img
                  src={imageData}
                  alt="preview"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DrawingsToLoad;
