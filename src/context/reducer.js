import { CHANGE_THEME } from "./types";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: payload,
      };

    default:
      return state;
  }
};

export default reducer;
