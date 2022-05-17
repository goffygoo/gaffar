import { LOGIN_SETSUSERNAME, LOGIN_SETSEMAIL, LOGIN_SETSPASSWORD, LOGIN_SIGNUP_ERROR, LOGIN_SIGNUP_USER, LOGIN_LOGIN_ERROR,LOGIN_SIGNUP_TOKEN ,LOGIN_SETLEMAIL, LOGIN_SETLPASSWORD} from "./actionTypes"
import store from '../store'
import axios from 'axios'

export const setsusername = val => dispatch => {
    dispatch({
        data: val,
        type: LOGIN_SETSUSERNAME
    })
}

export const setsemail = val => dispatch => {
    dispatch({
        data : val,
        type : LOGIN_SETSEMAIL
    })
}

export const setspassword = val => dispatch => {
    dispatch({
        data: val,
        type: LOGIN_SETSPASSWORD
    })
}

export const signup = (e, navigate) => dispatch => {
    e.preventDefault()

    const { susername, spassword, semail } = store.getState().login

    const req = {
        user_name: susername,
        user_email: semail, 
        user_password: spassword
    }

    axios.post('http://localhost:5000/user/createUser', req).then(res => {
        if (res.data.success === false) throw Error('Error')

        dispatch({
            data: false,
            type: LOGIN_SIGNUP_ERROR
        })

        const user = res.data.user
        localStorage.setItem('user', JSON.stringify(user))

        dispatch({
            data: user,
            type: LOGIN_SIGNUP_USER
        })

        const token = res.data.token
        localStorage.setItem('token', JSON.stringify(token))
        
        dispatch({
            data: token,
            type: LOGIN_SIGNUP_TOKEN
        })

        navigate('/home')
    }).catch(err => {
        dispatch({
            data: true,
            type: LOGIN_SIGNUP_ERROR
        })

        console.log(err)
    })
}

export const setlemail = val => dispatch => {
    dispatch({
        data : val,
        type : LOGIN_SETLEMAIL
    })
}

export const setlpassword = val => dispatch => {
    dispatch({
        data: val,
        type: LOGIN_SETLPASSWORD
    })
}

export const login = (e, navigate) => dispatch => {
    e.preventDefault()

    const { lpassword, lemail } = store.getState().login

    const req = {
        user_email: lemail, 
        user_password: lpassword
    }

    axios.post('http://localhost:5000/user/login', req).then(res => {
        if (res.data.success === false) throw Error('Error')

        dispatch({
            data: false,
            type: LOGIN_LOGIN_ERROR
        })

        const user = res.data.user
        localStorage.setItem('user', JSON.stringify(user))

        dispatch({
            data: user,
            type: LOGIN_SIGNUP_USER
        })

        const token = res.data.token
        localStorage.setItem('token', JSON.stringify(token))
        
        dispatch({
            data: token,
            type: LOGIN_SIGNUP_TOKEN
        })

        navigate('/home')
    }).catch(err => {
        dispatch({
            data: true,
            type: LOGIN_LOGIN_ERROR
        })

        console.log(err)
    })
}