import React from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineReload,
} from "react-icons/ai";

import Panel from "kromac-ui-18/dist/Panel";
import "./Attempts.style.scss";

const Attempts = ({ handlerReset, attempts }) => {
  const isValidItem = (isValid) => (isValid ? "valid" : "invalid");
  return (
    <section className="attempts">
      <Panel className="kromac-scroll">
        <section className="attempts__title">
          <h3>Attempts</h3>
          <AiOutlineReload className="reload__icon" onClick={handlerReset} />
        </section>
        <ul className="attempts__list">
          {attempts.map(({ word, isValid }, index) => (
            <li className="attempts__list__item" key={index}>
              {word}
              <label className={`${isValidItem(isValid)}`}>
                {isValid ? <AiOutlineCheck /> : <AiOutlineClose />}
              </label>
            </li>
          ))}
        </ul>
      </Panel>
    </section>
  );
};

export default Attempts;
