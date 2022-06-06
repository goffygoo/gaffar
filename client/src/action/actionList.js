import {
  LIST_SET_BOARD,
  LIST_OPEN_BOARD,
  LIST_SET_FULL,
  LIST_ADD_ITEM,
  PROJECT_ERROR,
} from "./actionTypes";
import { v4 as uuid } from "uuid";
import store from "../store";
import axios from "axios";
import config from "../config.json";
export const toggle = (id, taskId) => (dispatch) => {
  const { list, board } = store.getState().list;

  let to;
  list[id].tasks.forEach((e) => {
    if (e.id === taskId) {
      to = e.checked ? "To do" : "Done";
      e.checked = !e.checked;
    }
  });

  let flag = false;
  for (let c in board[id].columns) {
    for (let i of board[id].columns[c].items) {
      if (i.id === taskId) {
        board[id].columns[to].items.push(i);
        board[id].columns[c].items = board[id].columns[c].items.filter(
          (j) => j.id !== taskId
        );

        flag = true;
        break;
      }
    }

    if (flag) break;
  }

  dispatch({
    data: { list, board },
    type: LIST_SET_FULL,
  });
};

export const addTask =
  (board_id, content, deadline, description, membersAdded) => (dispatch) => {
    const { list, board } = store.getState().list;

    const id = uuid();

    list[board_id].tasks.push({ id, content, checked: false });
    board[board_id].columns["To do"].items.push({
      id,
      content,
      deadline,
      description,
      membersAdded,
    });

    dispatch({
      data: { list, board },
      type: LIST_SET_FULL,
    });
  };

export const addItem = (title) => (dispatch) => {
  const id = uuid();

  const list = {
    [id]: {
      title,
      tasks: [],
    },
  };

  const board = {
    [id]: {
      columns: {
        "To do": {
          name: "To do",
          index: 0,
          items: [],
        },
        Done: {
          name: "Done",
          index: 1,
          items: [],
        },
      },
      title,
    },
  };

  dispatch({
    data: { list, board },
    type: LIST_ADD_ITEM,
  });
};

export const openBoard = (id, navigate, link) => (dispatch) => {
  dispatch({
    data: id,
    type: LIST_OPEN_BOARD,
  });

  navigate(link);
};

export const delBoard = (id) => (dispatch) => {
  const { board_id, list, board } = store.getState().list;

  delete list[id];
  delete board[id];

  dispatch({
    data: {
      list,
      board,
      ...(board_id === id && { board_id: undefined }),
    },
    type: LIST_SET_FULL,
  });
};

export const onDragEnd = (result) => (dispatch) => {
  if (!result.destination) return;
  const { source, destination } = result;

  const { board_id, list, board } = store.getState().list;

  const { columns } = board[board_id];

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    list[board_id].tasks.forEach((i) => {
      if (i.id === removed.id) i.checked = destination.droppableId === "Done";
    });

    board[board_id].columns = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    };
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    board[board_id].columns = {
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    };
  }

  dispatch({
    data: { list, board },
    type: LIST_SET_FULL,
  });
};

export const addCol = (id, name) => (dispatch) => {
  const { board_id, board } = store.getState().list;
  const { columns } = board[board_id];

  const index = columns[id].index + 1;

  for (let col in columns) {
    if (columns[col].index >= index) {
      columns[col].index++;
    }
  }

  columns[uuid()] = {
    name,
    index,
    items: [],
  };

  board[board_id].columns = columns;

  console.log(board);

  dispatch({
    data: board,
    type: LIST_SET_BOARD,
  });
};

export const delCol = (id) => (dispatch) => {
  const { board_id, board } = store.getState().list;
  const { columns } = board[board_id];

  const index = columns[id].index + 1;

  if (columns[id].items.length !== 0) return;

  for (let col in columns) {
    if (columns[col].index >= index) {
      columns[col].index--;
    }
  }

  delete columns[id];

  dispatch({
    data: board,
    type: LIST_SET_BOARD,
  });
};

export const saveData = () => (dispatch) => {
  const {
    list,
    project: { project_id },
    login: { user, token },
  } = store.getState();

  const req = {
    list,
    project_id,
    user_email: user.email,
  };

  axios
    .post(config.SERVER + "/list/saveList", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.data === "Unauthorized") {
        dispatch({
          data: true,
          type: PROJECT_ERROR,
        });
      }
    });
};
