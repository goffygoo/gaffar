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
  const { list: { list }, project: { is_admin } } = useSelector(state => state)

  const [popupAddTask, setpopupAddTask] = useState(false);
  const [item, setitem] = useState('')

  return (
    <>
      {popupAddTask !== false ? (
        <AddTask view={setpopupAddTask} id={popupAddTask} addTask={addTask} />
      ) : null}

      <div className={styles.container}>
        {is_admin ?
          <div className={styles.addSaveCtn}>
            <input value={item} onChange={e => {
              if (e.target.value.length > 40) return
              setitem(e.target.value)
            }} spellCheck='false' placeholder='List name goes here..'/>
            <div className={styles.addListBtn} onClick={() => {
              if (!item.trim()) return
              addItem(item)
              setitem('')
            }}>
              <p>Add List</p>
            </div>
            <div onClick={() => saveData()} className={styles.saveBtn}>
              <p>Save</p>
            </div>
          </div>
          : null}
        {Object.entries(list).map(([id, obj]) => {
          return (
            <div key={id} className={styles.item}>
              <div className={styles.itemHead}>
                <h1>{obj.title}</h1>
                <div className={styles.btnCtn + " noselect"} >
                  {is_admin ?
                    <img onClick={() => setpopupAddTask(id)} src="/plus.png" alt='add' />
                    : null}
                  {is_admin ?
                    <img onClick={() => delBoard(id)} className={styles.deleteBtn} src='/delete.svg' alt='delete' />
                    : null}
                  <img src="/open.svg" alt="" onClick={() => openBoard(id, navigate, `/project/${params.id}/board`)} />
                </div>
              </div>
              <div className={styles.subContainer}>
                {obj.tasks.map(task => {
                  return (
                    <div key={task.id} className={styles.taskContainer} onClick={() => {
                      if (!is_admin) return;
                      toggle(id, task.id);
                    }} >
                      <div className={styles.tick + " noselect"}>
                        {
                          task.checked ?
                            <img src="/tick.png" alt='✔' />
                            :
                            null
                        }
                      </div>
                      <div className={task.checked ? styles.taskChecked : ""}>{task.content}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
