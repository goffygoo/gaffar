import React from 'react'
import { useSelector } from 'react-redux'

export default function ViewNum() {
    const { lock, error } = useSelector(state => state.test)

    return (
    <div>
        <div>{lock}</div>
        {error ? <div>Lock didn't match</div> : null}
    </div>
  )
}
