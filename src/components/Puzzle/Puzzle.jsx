import React from "react";
import Button from "kromac-ui-18/dist/Button";
import Panel from "kromac-ui-18/dist/Panel";
import WordPuzzle from "../WordPuzzle";
import "./Puzzle.style.scss";

const Puzzle = ({
  txtSearch,
  setTxtSearch,
  matcher,
  message,
  puzzle,
  pointsDrawed,
}) => {
  return (
    <section className="puzzle">
      <Panel>
        <section className="search__section">
          <h3>Search box</h3>
          <section className="search__section__input">
            <input
              type="text"
              value={txtSearch}
              onChange={(e) => setTxtSearch(e.target.value)}
            />
            <Button buttonType="neon" onClick={matcher}>
              Send
            </Button>
          </section>
          {message && <label className="error__message">{message}</label>}
        </section>
        <WordPuzzle puzzle={puzzle} pointsDrawed={pointsDrawed} />
      </Panel>
    </section>
  );
};

export default Puzzle;
