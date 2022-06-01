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

  const { toggle, addTask, addItem, openBoard, delBoard, saveData } = bindActionCreators(actionList, dispatch)
  const { list:{list} , project:{is_admin} } = useSelector(state => state)

  const [popupAddTask, setpopupAddTask] = useState(false);
  const [item, setitem] = useState('')

  return (
    <>
      {popupAddTask !== false ? (
        <AddTask view={setpopupAddTask} id={popupAddTask} addTask={addTask} />
      ) : null}

      <div className={styles.container}>
        {is_admin ? 
        <button onClick={() => saveData()}>Save</button> 
        : null} 
        {Object.entries(list).map(([id, obj]) => {
          return (
            <div key={id} className={styles.item}>
              <div className={styles.itemHead}>
                <h1>{obj.title}</h1>
                {is_admin ? 
                <button onClick={() => setpopupAddTask(id)} >+</button>
                : null}
                <button onClick={() => openBoard(id, navigate, `/project${params.id}/board`)}>🔲</button>
                {is_admin ? 
                <button onClick={() => delBoard(id)}>💣</button>
                : null} 
              </div>
              <div className={styles.subContainer}>
                {obj.tasks.map(task => {
                  return (
                    <div key={task.id} className={styles.taskContainer} >
                      {is_admin ?
                      <input id={`checkbox${task.id}`} type="checkbox" checked={task.checked} onChange={() => toggle(id, task.id)} />
                      : null}
                      <label htmlFor={`checkbox${task.id}`} className={task.checked ? styles.taskChecked : ""}>{task.content}</label>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        {is_admin ?
        <div className={styles.addItem}>
          <input value={item} onChange={e => setitem(e.target.value)}></input>
          <button onClick={() => {
            addItem(item)
            setitem('')
          }} >+</button>
        </div>
        : null}
      </div>
    </>
  )
}
