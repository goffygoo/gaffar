import React from 'react'
import Branding from '../components/Branding'
import styles from '../styles/pages/Project.module.css'

export default function Project() {
  return (
    <div className={styles.page}>
      <div className={styles.navbar}>
          <Branding/>
          
      </div>

      <div className={styles.content}>
        <div className={styles.titlebar}>
        <h1>Title</h1>

        </div>
      </div>

    </div>
  )
}
