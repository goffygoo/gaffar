import { CODE, DATA_LOCK_UP, DATA_LOCK_DOWN, SET_SCROLL, LOCK_MACTH, LOCK_SET_ERROR } from "./actionTypes"
import store from '../store'

export const func = () => dispatch => {
    // CODE
    dispatch({
        data: "dispatched",
        type: CODE,
    })
}

export const setscroll = (slug) => dispatch => {
    dispatch({
        data: slug,
        type: SET_SCROLL,
    })
}

export const up = () => dispatch => {
    const slug = +store.getState().test.scroll
    if (isNaN(slug)) return

    dispatch({
        data: slug,
        type: DATA_LOCK_UP,
    })
}

export const down = () => dispatch => {
    const slug = +store.getState().test.scroll
    if (isNaN(slug)) return

    dispatch({
        data: slug,
        type: DATA_LOCK_DOWN,
    })
}

export const match = (navigate) => dispatch => {
    const { pass, lock } = store.getState().test
    
    if (pass !== lock) {
        dispatch({
            data: true,
            type: LOCK_SET_ERROR
        })
    } else {
        dispatch({
            data: "slug",
            type: LOCK_MACTH,
        })
        
        navigate('/')
    }
}
