import React from 'react'
import styles from '../styles/components/branding.module.css'

export default function Branding(props) {
    const { 
        height = "8vh",
        width = "10vw"
    } = props
    
  return (
    <div className={styles.container} style={{height, width}}>

    </div>
  )
}
