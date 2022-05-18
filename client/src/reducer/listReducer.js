import { LIST_SET_LIST } from './../action/actionTypes'
import { v4 as uuid } from "uuid";

const initialstate = {
    list: {
        [uuid()]: {
            title: "Front End",
            tasks: [
                { id: uuid(), content: "First task", checked: false },
                { id: uuid(), content: "Second task", checked: false },
                { id: uuid(), content: "Third task", checked: false },
                { id: uuid(), content: "Fourth task", checked: false },
                { id: uuid(), content: "Fifth task", checked: false }
            ]
        },
        [uuid()]: {
            title: "Backend End",
            tasks: [
                { id: uuid(), content: "First task", checked: false },
                { id: uuid(), content: "Second task", checked: false },
                { id: uuid(), content: "Third task", checked: false },
                { id: uuid(), content: "Fourth task", checked: false },
                { id: uuid(), content: "Fifth task", checked: false }
            ]
        },
    }
}

const func = function (state = initialstate, action) {
    switch (action.type) {
        case LIST_SET_LIST:
            return {
                ...state,
                list: action.data
            }
        default:
            return state;
    }
}

export default func