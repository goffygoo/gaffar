import React from 'react'
import styles from '../../styles/components/project/Mytasks.module.css'
import Task from "./board/Task";
import { useSelector } from "react-redux";

export default function Mytasks() {
  const { mytasks } = useSelector((state) => state);

  return (
    <div className={styles.container}>
      <div className={styles.taskTile}>
        <p>{" item.content "}</p>
        <img
          src="/eye.png"
          alt="view"
          // onClick={() => setpopupTask(item)}
        />
      </div>
    </div>
  )
}
