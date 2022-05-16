import { combineReducers } from 'redux'
import test from './testReducer'
import login from './loginReducer'

export default combineReducers({
    test,
    login
})