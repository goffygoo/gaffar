import { BOARD_SET_COL } from "./../action/actionTypes";
import { v4 as uuid } from "uuid";

const initialstate = {
  columns: {
    "To do": {
      name: "To do",
      index: 0,
      items: [
        {
          id: uuid(),
          content: "First task",
          deadline: "12/05/2022",
          description: "This is a task",
          membersAdded: [],
        },
        {
          id: uuid(),
          content: "Second task",
          deadline: "12/05/2022",
          description: "This is a task",
          membersAdded: [],
        },
        {
          id: uuid(),
          content: "Third task",
          deadline: "12/05/2022",
          description: "This is a task",
          membersAdded: [],
        },
        {
          id: uuid(),
          content: "Fourth task",
          deadline: "12/05/2022",
          description: "This is a task",
          membersAdded: [],
        },
        {
          id: uuid(),
          content: "Fifth task",
          deadline: "12/05/2022",
          description: "This is a task",
          membersAdded: [],
        },
      ],
    },
    [uuid()]: {
      name: "In Progress",
      index: 1,
      items: [],
    },
    [uuid()]: {
      name: "Testing",
      index: 2,
      items: [],
    },
    Done: {
      name: "Done",
      index: 3,
      items: [],
    },
  },
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case BOARD_SET_COL:
      return {
        ...state,
        columns: action.data,
      };
    default:
      return state;
  }
};

export default func;
