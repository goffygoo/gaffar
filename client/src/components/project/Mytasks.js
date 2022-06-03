import React, { useState } from 'react'
import styles from '../../styles/components/project/Mytasks.module.css'
import Task from "./board/Task";
import { useSelector } from "react-redux";

export default function Mytasks() {
  const { tasks } = useSelector((state) => state.mytasks);
  const [popupTask, setpopupTask] = useState(false);

  return (
    <>
      {popupTask !== false ? (
        <Task item={popupTask} view={setpopupTask} />
      ) : null}

      <div className={styles.container}>
        <div className={styles.mainContainer}>
        
          {tasks.sort((a, b) => a.checked - b.checked).map(t => {
            return (
              <div key={t.id} className={`${styles.taskTile} ${t.checked ? styles.done : ""}`}>
                <p>{t.content}</p>
                <img
                  src="/eye.png"
                  alt="view"
                  onClick={() => setpopupTask(t)}
                />
              </div>
            )
          })}


        </div>
      </div>
    </>
  )
}
