import { BOARD_SET_COL } from "./actionTypes";
import { v4 as uuid } from "uuid";
import store from "../store";

export const setColumns = (data) => (dispatch) => {
  dispatch({
    data,
    type: BOARD_SET_COL,
  });
};

export const addCol = (id, name) => (dispatch) => {
  const { columns } = store.getState().board;
  const index = columns[id].index + 1;

  const data = { ...columns };

  for (let col in data) {
    if (data[col].index >= index) {
      data[col].index++;
    }
  }

  data[uuid()] = {
    name,
    index,
    items: [],
  };

  dispatch({
    data,
    type: BOARD_SET_COL,
  });
};

export const delCol = (id) => (dispatch) => {
  const { columns } = store.getState().board;
  const index = columns[id].index + 1;

  if (columns[id].items.length !== 0) return;

  const data = { ...columns };

  for (let col in data) {
    if (data[col].index >= index) {
      data[col].index--;
    }
  }

  delete data[id];

  dispatch({
    data,
    type: BOARD_SET_COL,
  });
};

// (task, deadline, description, members)
export const addTask =
  (name, deadline, description, membersAdded) => (dispatch) => {
    const { columns } = store.getState().board;
    const data = { ...columns };
    data["To do"].items.push({
      id: uuid(),
      content: name,
      deadline: deadline,
      description: description,
      membersAdded: membersAdded,
    });

    dispatch({
      data,
      type: BOARD_SET_COL,
    });
  };
