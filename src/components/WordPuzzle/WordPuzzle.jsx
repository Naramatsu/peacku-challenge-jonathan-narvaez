import React from "react";
import Panel from "kromac-ui-18/dist/Panel";
import "./WordPuzzle.style.scss";

const WordPuzzle = ({ puzzle, pointsDrawed }) => {
  const isDrawed = (row, col) => {
    return pointsDrawed.find((point) => point.row === row && point.col === col)
      ? "draw"
      : "";
  };
  return (
    <Panel borderNeon>
      {puzzle.map((row, indexRow) => (
        <div className="puzzle__row" key={indexRow}>
          {row.map((col, indexCol) => (
            <div
              key={indexCol}
              className={`puzzle__col ${isDrawed(indexRow + 1, indexCol + 1)}`}
            >
              {col}
            </div>
          ))}
        </div>
      ))}
    </Panel>
  );
};

export default WordPuzzle;
