import React, { useReducer } from "react";
import { AppContext } from ".";
import AppReducer from "./reducer";
import { CHANGE_THEME, LIGHT, THEME } from "./types";

const AppState = (props) => {
  const initialstate = {
    theme: JSON.parse(localStorage.getItem(THEME)) || LIGHT,
  };
  const [globalState, dispatch] = useReducer(AppReducer, initialstate);

  const changeTheme = (theme) => {
    dispatch({
      type: CHANGE_THEME,
      payload: theme,
    });
    localStorage.setItem(THEME, JSON.stringify(theme));
  };

  const combineFunctions = {
    changeTheme,
  };

  return (
    <AppContext.Provider value={{ ...globalState, ...combineFunctions }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
