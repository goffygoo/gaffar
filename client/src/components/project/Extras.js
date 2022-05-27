import React, { useState } from 'react'
import styles from '../../styles/components/project/Extras.module.css'
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as actionProject from '../../action/actionProject'

export default function Extras() {
  const dispatch = useDispatch()
  const { saveExtras } = bindActionCreators(actionProject, dispatch)

  const [git, setgit] = useState("");
  const [disc, setdisc] = useState("");
  const [res, setres] = useState("");
  const [note, setnote] = useState("");

  const [edit, setedit] = useState(false)

  return (
    <div className={styles.mainCtn}>
      <div className={styles.component}>
        <div className={styles.first}>
          <div className={styles.title}><p>GitHub</p></div>
          <div className={styles.editBtn} onClick = {() => {setedit("github")}}><p>{edit === "github" ? "Cancel" : "Edit"}</p></div>
          <div className={styles.saveBtn} onClick = {() => saveExtras(git,disc,res,note)}><p>Save</p></div>
        </div>
        <input className={styles.input}  value = {git} onChange = {e=>setgit(e.target.value)} />
      </div>
      <div className={styles.component}>
        <div className={styles.first}>
          <div className={styles.title}><p>Discode</p></div>
          <div className={styles.editBtn} onClick = {e => {setedit("discode")}}><p>Edit</p></div>
          <div className={styles.saveBtn}><p>Save</p></div>
        </div>
        <input className={styles.input}  value = {disc} onChange = {e=>setdisc(e.target.value)}/>
      </div>
      <div className={styles.component2}>
        <div className={styles.first}>
          <div className={styles.title}><p>Resources</p></div>
          <div className={styles.editBtn} onClick = {e => {setedit("resources")}}><p>Edit</p></div>
          <div className={styles.saveBtn}><p>Save</p></div>
        </div>
        <div className={styles.textarea}><textarea  value = {res} onChange = {e=>setres(e.target.value)}/></div>
      </div>
      <div className={styles.component2}>
        <div className={styles.first}>
          <div className={styles.title}><p>Notes</p></div>
          <div className={styles.editBtn} onClick = {e => {setedit("notes")}}><p>Edit</p></div>
          <div className={styles.saveBtn}><p>Save</p></div>
        </div>
        <div className={styles.textarea}><textarea  value = {note} onChange = {e=>setnote(e.target.value)}/></div>
      </div>
    </div>
  )
}
