import { combineReducers } from "redux";
import login from "./loginReducer";
import list from "./listReducer";
import board from "./boardReducer";
import docs from "./docsReducer";
import home from "./homeReducer";

export default combineReducers({
  login,
  list,
  board,
  docs,
  home,
});
