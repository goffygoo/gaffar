import { LIST_SET_LIST } from "./actionTypes";
import { v4 as uuid } from "uuid";
import store from "../store";

export const toggle = (id, taskId) => (dispatch) => {
    const { list } = store.getState().list

    const data = {...list}

    data[id].tasks.forEach(e => {
        if (e.id === taskId) e.checked = !e.checked
    })

    dispatch({
        data,
        type: LIST_SET_LIST
    })
};

export const addTask = (id, text) => (dispatch) => {
    const { list } = store.getState().list

    const data = {...list}
    data[id].tasks.push({ id: uuid(), content: text, checked: false })

    dispatch({
        data,
        type: LIST_SET_LIST
    })
};

export const addItem = (title) => (dispatch) => {
    const { list } = store.getState().list

    const data = {...list}
    data[uuid()] = {
        title,
        tasks: []
    }

    dispatch({
        data,
        type: LIST_SET_LIST
    })
};