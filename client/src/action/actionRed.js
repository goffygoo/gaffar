import { CODE } from "./actiontypes"

export const initialize = () => dispatch => {
    // CODE
    dispatch({
        data: "dispatched",
        type: CODE,
    })
}