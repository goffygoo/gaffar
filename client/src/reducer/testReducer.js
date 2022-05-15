import { CODE, DATA_LOCK_DOWN, DATA_LOCK_UP, LOCK_MACTH, LOCK_SET_ERROR, SET_SCROLL } from './../action/actionTypes'

const initialstate = {
    pass: 1337.69,
    lock: 0,
    scroll: 0,
    error: false
}

const func = function (state = initialstate, action) {
    switch (action.type) {
        case CODE:
            return {
                ...state, newData: action.data
            }
        case DATA_LOCK_UP:
            return {
                ...state,
                lock: state.lock + action.data
            }
        case DATA_LOCK_DOWN:
            return {
                ...state,
                lock: state.lock - action.data
            }
        case SET_SCROLL:
            return {
                ...state,
                scroll: action.data
            }
        case LOCK_SET_ERROR:
            return {
                ...state,
                error: action.data
            }
        case LOCK_MACTH:
            return {
                ...state,
                error: false
            }
        default:
            return state;
    }
}

export default func