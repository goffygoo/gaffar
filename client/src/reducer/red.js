import { CODE } from './../action/actionTypes'

const initialstate = {
    data : "OP"
}

const func = function(state = initialstate, action){
    switch(action.type){
        case CODE:
            return{
                ...state, newData: action.data
            }
        default:
            return state;
    }
}

export default func