import {
    APPEND_MESSAGES,
    SET_MESSAGES
} from "../action/actionTypes";

const initialstate = {
    messages: []
};

const func = function (state = initialstate, action) {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.data
            };
        case APPEND_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, action.data]
            };
        default:
            return state;
    }
};

export default func;
