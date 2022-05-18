import { combineReducers } from "redux";
import test from "./testReducer";
import login from "./loginReducer";
import list from "./listReducer";
import board from "./boardReducer";
import docs from "./docsReducer";

export default combineReducers({
  test,
  login,
  list,
  board,
  docs,
});
