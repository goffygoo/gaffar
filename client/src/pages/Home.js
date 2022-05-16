import React from 'react'
import Branding from '../components/Branding'
import Project from '../components/home/Project'
import Invite from '../components/home/Invite'
import styles from '../styles/pages/Home.module.css'


export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.topArea}>
        <Branding height="10vh"/>

        <div className={styles.logoutBtn}>

        </div>
      </div>
      <div className= {styles.mainWindow}> 
        <div className={styles.mainContainer}>
          <div className={styles.projectsContainer}>
            <div className={styles.projectHeading}></div>
            <Project/>
            <Project/>
            <Project/>
            <Project/>
          </div>
          <div className={styles.addProjectBtn}> </div>
          <div className={styles.invitesContainer}> 
          <div className={styles.projectHeading}></div>
            <Invite/>
            <Invite/>
            <Invite/>
          </div> 
        </div>
        <div className={styles.profileContainer}> 
          <div className={styles.profilePicture}> 
          <img src="/me.jpeg" alt='profile' className={styles.picture}/> 
          </div>
          <div className={styles.username}>Goffygoo</div>
          <div className={styles.buttonContainer}>
            <div className={styles.edit}></div>
            <div className={styles.update}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
