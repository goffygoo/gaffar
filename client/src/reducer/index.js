import { combineReducers } from "redux";
import test from "./testReducer";
import login from "./loginReducer";
import docs from "./docsReducer";

export default combineReducers({
  test,
  login,
  docs,
});
