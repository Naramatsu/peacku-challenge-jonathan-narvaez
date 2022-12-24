import React, { useState, useContext } from "react";
import { AppContext } from "./context";
import Attempts from "./components/Attempts";
import Button from "kromac-ui-18/dist/Button";
import { DARK, LIGHT } from "./context/types";
import { findWord, pathBuilder } from "./components/utils";
import ModalToSetPuzzle from "./components/ModalToSetPuzzle";
import Puzzle from "./components/Puzzle";
import Toggle from "kromac-ui-18/dist/Toggle";
import "./App.style.scss";
import "kromac-ui-18/src/css/style.css";

const initialPuzzle = [
  ["D", "E", "Y", "Q", "A", "U", "G"],
  ["X", "R", "G", "T", "U", "A", "V"],
  ["S", "C", "A", "S", "A", "B", "E"],
  ["X", "A", "J", "G", "U", "H", "V"],
  ["F", "M", "O", "R", "O", "L", "B"],
  ["G", "A", "H", "J", "E", "N", "E"],
];

const App = () => {
  const { theme, changeTheme } = useContext(AppContext);
  const [txtSearch, setTxtSearch] = useState("");
  const [pointsDrawed, setPointsDrawed] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [puzzle, setPuzzle] = useState(initialPuzzle);

  const matcher = (e) => {
    const res = {};
    res[txtSearch] = findWord(puzzle, txtSearch);
    if (res[txtSearch]) {
      const { start, end } = res[txtSearch];
      setPointsDrawed([...pointsDrawed, ...pathBuilder(start, end)]);
      setAttempts([...attempts, { word: txtSearch, isValid: true }]);
      setTxtSearch("");
      setMessage("");
    } else {
      setMessage("This word is not in the puzzle...!");
      setAttempts([...attempts, { word: txtSearch, isValid: false }]);
    }
    e.preventDefault();
  };

  const handlerReset = (e) => {
    setPointsDrawed([]);
    setTxtSearch("");
    setMessage("");
    setAttempts([]);
    e.preventDefault();
  };

  const handlerChangeTheme = () => {
    changeTheme(theme === LIGHT ? DARK : LIGHT);
  };

  const isLight = theme === LIGHT;

  return (
    <div className={`App ${theme}`}>
      <h1>Word Puzzle</h1>
      <section className="container">
        <Puzzle
          txtSearch={txtSearch}
          setTxtSearch={setTxtSearch}
          matcher={matcher}
          message={message}
          puzzle={puzzle}
          pointsDrawed={pointsDrawed}
        />
        <Attempts handlerReset={handlerReset} attempts={attempts} />
      </section>
      <section className="btn__set__puzzle" style={{ marginTop: "2em" }}>
        <Button buttonType="neon" onClick={() => setShowModal(true)}>
          Set Puzzle
        </Button>
      </section>
      {showModal && (
        <ModalToSetPuzzle
          onClose={() => setShowModal(false)}
          handlerPuzzle={setPuzzle}
        />
      )}
      <section className="toggle__theme">
        <Toggle
          checked={isLight}
          toggleType="power"
          onChange={handlerChangeTheme}
        />
      </section>
    </div>
  );
};

export default App;
