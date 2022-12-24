import React, { useContext, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AppContext } from "../../context";
import Button from "kromac-ui-18/dist/Button";
import { DARK } from "../../context/types";
import Panel from "kromac-ui-18/dist/Panel";
import "./ModalToSetPuzzle.style.scss";

const ModalToSetPuzzle = ({ handlerPuzzle, onClose }) => {
  const { theme } = useContext(AppContext);
  const [txtPuzzle, setTxtPuzzle] = useState("");
  const [message, setMessage] = useState("");

  const validateInput = (e) => {
    if (txtPuzzle.length <= 1) {
      setMessage("Please insert a valid puzzle");
      return;
    }
    const rows = txtPuzzle.split("\n");
    const rowLength = rows[0].length;
    if (rows.some((row) => row.length < rowLength)) {
      setMessage(
        "Please insert a valid puzzle, All the rows must hace the same number of characters"
      );
      return;
    }
    handlerPuzzle(rows.map((row) => row.toUpperCase().split(",")));
    setTxtPuzzle("");
    setMessage("");
    onClose();
    e.preventDefault();
  };

  const isDark = theme === DARK;

  return (
    <section className="modal">
      <Panel borderNeon={isDark} className="modal__content">
        <section className="modal__title">
          <h3>Please insert the pusle</h3>
          <AiFillCloseCircle className="close__icon" onClick={onClose} />
          <hr />
        </section>
        <br />
        <section className="content__flex">
          <section className="content__flex__section">
            <p>
              <b>Note: </b>
              Take in mind, the right way to set the puzzle is:
            </p>
            <ol>
              <li>Write each letter separated by a comma</li>
              <li>Each line break represents a new row</li>
              <li>all rows must have the same number of characters</li>
            </ol>
            <label>Example:</label>
            <br />
            <code>
              D,E,Y,Q,A,U,G
              <br />
              X,R,G,T,U,A,V
              <br />
              S,C,A,S,A,B,E
              <br />
              X,A,J,G,U,H,V
              <br />
              F,M,O,R,O,L,B
              <br />
              G,A,H,J,E,N,E
            </code>
          </section>
          <section className="content__flex__section">
            <textarea
              className="textarea"
              value={txtPuzzle}
              onChange={(e) => setTxtPuzzle(e.target.value)}
            ></textarea>
          </section>
        </section>
        <section className="btn__set__puzzle">
          <Button buttonType="neon" onClick={validateInput}>
            Set Puzzle
          </Button>
          {message && <label className="error__message">{message}</label>}
        </section>
      </Panel>
    </section>
  );
};

export default ModalToSetPuzzle;
