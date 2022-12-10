import { SET_QUILL_DATA } from "../action/actionTypes";

const initialstate = {
    contents: null,
};

const func = function (state = initialstate, action) {
    switch (action.type) {
        case SET_QUILL_DATA:
            return {
                ...state,
                contents: action.data
            };
        // case APPEND_MESSAGES:
        //     return {
        //         ...state,
        //         messages: [...state.messages, action.data]
        //     };
        default:
            return state;
    }
};

export default func;
