import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'

import * as actionTest from '../action/actionTest'
import ViewNum from '../components/viewNum'



export default function Test() {
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const { up, down, setscroll, match } = bindActionCreators(actionTest, dispatch) 

  return (
    <div>
      <ViewNum />

      <input type="number" onChange={e => setscroll(e.target.value)}></input>

      <button onClick={() => up()}>Up</button>
      <button onClick={() => down()}>Down</button>
      <button onClick={() => match(navigate)}>Unlock</button>
    </div>
  )
}
