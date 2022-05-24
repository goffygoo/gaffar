import React, { useState } from 'react'
import styles from '../../styles/components/project/List.module.css'
import AddTask from './board/AddTask'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionList from '../../action/actionList'
import { useSelector } from 'react-redux'

export default function List() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const { toggle, addTask, addItem, openBoard } = bindActionCreators(actionList, dispatch)
  const { list } = useSelector(state => state.list)

  const [popupAddTask, setpopupAddTask] = useState(false);
  const [item, setitem] = useState('')

  return (
    <>
      {popupAddTask !== false ? (
        <AddTask view={setpopupAddTask} id={popupAddTask} addTask={addTask} />
      ) : null}

      <div className={styles.container}>
        {Object.entries(list).map(([id, obj]) => {
          return (
            <div key={id} className={styles.item}>
              <div className={styles.itemHead}>
                <h1>{obj.title}</h1>
                <button onClick={() => setpopupAddTask(id)} >+</button>
                <button onClick={() => openBoard(id, navigate, `/project${params.id}/board`)}>✔</button>
              </div>
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
    </>
  )
}
