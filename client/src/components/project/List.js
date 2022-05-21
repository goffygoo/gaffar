import React, { useState } from 'react'
import styles from '../../styles/components/project/List.module.css'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionTest from '../../action/actionList'
import { useSelector } from 'react-redux'

export default function List() {
  const dispatch = useDispatch()
  const { toggle, addTask, addItem } = bindActionCreators(actionTest, dispatch)
  const { list } = useSelector(state => state.list)

  const [edit, setedit] = useState('')
  const [text, settext] = useState('')
  const [item, setitem] = useState('')

  return (
    <div className={styles.container}>
      {Object.entries(list).map(([id, obj]) => {
        return (
          <div key={id} className={styles.item}>
            <div className={styles.itemHead}>
              <h1>{obj.title}</h1>
              {
                edit !== id ?
                  <button onClick={() => {
                    settext('')
                    setedit(id)
                  }} >+</button>
                  : null
              }
            </div>
            {
              edit === id ?
                <div>
                  <input value={text} onChange={e => settext(e.target.value)}></input>
                  <button onClick={() => {
                    addTask(id, text)
                    settext('')
                    setedit('')
                  }} >+</button>
                </div>
                : null
            }
            <div className={styles.subContainer}>
              {obj.tasks.map(task => {
                return (
                  <div key={task.id} className={styles.taskContainer} >
                    <input id={`checkbox${task.id}`} type="checkbox" checked={task.checked} onChange={() => toggle(id, task.id)} />
                    <label htmlFor={`checkbox${task.id}`} className={task.checked ? styles.taskChecked : ""}>{task.content}</label>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className={styles.addItem}>
        <input value={item} onChange={e => setitem(e.target.value)}></input>
        <button onClick={() => {
          addItem(item)
          setitem('')
        }} >+</button>
      </div>
    </div>
  )
}
