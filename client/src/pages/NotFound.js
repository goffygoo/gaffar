import React from 'react'
import styles from '../styles/pages/NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.number}> 404</div>
      <div className={styles.text}> <span>Ooops...</span><br/>page not found</div>
      <a className={styles.me} href="/">Home</a>
    </div>
  )
}
