import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../../styles/components/project/board/Task.module.css'

export default function Task(props) {
  // const { members } = useSelector(state => state.member)

  const { view, item } = props

  return (
    <div className={styles.containerPopup}>
      <div className={styles.popup}>
        <img src="/close.png" alt="cancel" onClick={() => view(false)} />
        <h1>Task</h1>
        <div className={styles.topCtn}>
          <div className={styles.inputfield}>
            <label className={styles.label}>Name</label>
            <label className={styles.label}>Deadline</label>
          </div>
          <div className={styles.inputfield}>
            <p className={styles.input1}>{item.content}</p>
            <p className={styles.input1}> {item.deadline}</p>
          </div>
          <div className={styles.taskDescription}>
            <div className={styles.label}>Description</div>
            <div className={styles.description}>
              <p>{item.description}</p>
            </div>
          </div>
          <div className={styles.memberContainer}>
            <h1>Added</h1>
            <div className={styles.members}>
              {item.membersAdded.map((mem) => {
                return (
                  <div className={styles.memberCtn}>
                    <img
                      src={`http://localhost:5000/user/getImg?img_id=${mem.user_photu}`}
                      alt="img"
                    />
                    <div className={styles.memberInfo}>
                      <p className={styles.name}>{mem.user_name}</p>
                      <p className={styles.role}>{mem.user_role}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
