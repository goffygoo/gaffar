import { LIST_OPEN_BOARD, LIST_SET_FULL, LIST_SET_BOARD, LIST_ADD_ITEM } from './../action/actionTypes'

const initialstate = {
    list: {},
    board: {}
}

const func = function (state = initialstate, action) {
    switch (action.type) {
        case LIST_SET_BOARD:
            return {
                ...state,
                board: action.data
            }
        case LIST_OPEN_BOARD:
            return {
                ...state,
                board_id: action.data
            }
        case LIST_ADD_ITEM:
            return {
                ...state,
                list: {...state.list, ...action.data.list},
                board: {...state.board, ...action.data.board}
            }
        case LIST_SET_FULL:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

export default func