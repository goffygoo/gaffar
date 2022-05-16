import React from 'react'
import styles from '../../styles/components/project/Tabs.module.css'

export default function Tabs(props) {
  const { 
    name = "Tabs",
    navigate,
    link = ""
  } = props

  return (
    <div className={styles.container} onClick={() => {navigate(`/project/${link}`)}}>
      <p>{name}</p>
    </div>
  )
}
