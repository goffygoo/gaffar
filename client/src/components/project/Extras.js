import React, { useState } from 'react'
import styles from '../../styles/components/project/Extras.module.css'

export default function Extras() {

  let [gitl, setgitl] = useState("");
  let [discl, setdiscl] = useState("");
  let [reso, setreso] = useState("");
  let [note, setnote] = useState("");

  return (
    <div className={styles.mainCtn}>
      <div className={styles.component}>
        <div className={styles.first}>
          <div className={styles.title}><p>GitHub</p></div>
          <div className={styles.editBtn}><p>Edit</p></div>
          <div className={styles.saveBtn}><p>Save</p></div>
        </div>
        <input className={styles.input}  />
      </div>
      <div className={styles.component}>
        <div className={styles.first}>
          <div className={styles.title}><p>Discode</p></div>
          <div className={styles.editBtn}><p>Edit</p></div>
          <div className={styles.saveBtn}><p>Save</p></div>
        </div>
        <input className={styles.input} />
      </div>
      <div className={styles.component2}>
        <div className={styles.first}>
          <div className={styles.title}><p>Resources</p></div>
          <div className={styles.editBtn}><p>Edit</p></div>
          <div className={styles.saveBtn}><p>Save</p></div>
        </div>
        <div className={styles.textarea}><textarea/></div>
      </div>
      <div className={styles.component2}>
        <div className={styles.first}>
          <div className={styles.title}><p>Notes</p></div>
          <div className={styles.editBtn}><p>Edit</p></div>
          <div className={styles.saveBtn}><p>Save</p></div>
        </div>
        <div className={styles.textarea}><textarea/></div>
      </div>
    </div>
  )
}
