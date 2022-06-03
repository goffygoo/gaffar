import React from 'react'
import styles from '../styles/pages/LandingPage.module.css'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className={`${styles.ctn} noselect`}>
      <div className={styles.header}>
        <img className={styles.curve1} src="/curve1.svg" alt="" />
        <div className={styles.headerContent}>
          <div className={styles.headertext}>
            <div className={styles.logo}><img src="/logo.svg" alt='logo' /></div>
            <div className={styles.heading}><p>Get it Done</p></div>
            <div className={styles.subheading}>
              <p>
                Tired of hectic work of managing projects and teams all the time ? <br />
                Needed a tool to manage all your works at one place ? <br />
                Get it done with <span>Gaffar</span> .<br />
                With our easy to use user interface and highly secure platform, <br />
                keep everything in order and save your precious time. <br />
              </p>
            </div>

            <div className={styles.diveIn} onClick={() => navigate('/home')}>
              <div className={styles.diveInBox}>
                <span>Dive In</span>
                <div className={styles.wave}></div>
              </div>
            </div>

          </div>
          <div className={styles.coverPicture}>
            <img src="/cover.svg" alt="Cover" />
          </div>
        </div>
        <img className={styles.curve2} src="/curve2.svg" alt="" />
      </div>

      <div className={styles.sec2}>
        <div className={styles.sec2heading}>
          <h2>Easily manage your task using our</h2>
          <h1>Kanaban Board</h1>
          <p>Track progress using our highly intractive board which provides fully flexible columns and advanced task management</p>
        </div>
        <img src="/board.png" alt='board' />
      </div>

      <div className={styles.sec3}>

        <h1>Our Features</h1>
        <div className={styles.featureBox}>
          <div className={styles.featuresLeft}>
            <img src='/robo.svg' alt='robo' />
            <div className={styles.textDescriptionLeft}>
              <h3>Dashboard</h3>
              <p>All in one dashboard to manage your teams and social profile on the platform. Also handles team invitation for better user experience.</p>
            </div>
          </div>
          <div className={styles.pointerRight}>
            <img className={styles.rlImage} src="/pointRight.svg" alt='right' />
            <div></div>
          </div>
          <div className={styles.featuresRight}>
            <div className={styles.textDescriptionRight}><h3>Teams</h3>
              <p>You can create your own team to work collaboratively in a project. All members of a team can track the progress of the project any time and can also keep track of the tasks assigned to them by the team leaders.</p></div>
            <img src='/boyComp.svg' alt='robo' />
          </div>
          <div className={styles.pointerLeft}>
            <img className={styles.lrImage} src="/pointLeft.svg" alt='right' />
          </div>
          <div className={styles.featuresLeft}>
            <img src='/managing.svg' alt='robo' />
            <div className={styles.textDescriptionLeft}>
              <h3>List</h3>
              <p>Manage your project using our advanced to-do list. Assign a task to members with our other handy features and track your overall progress at one place. </p>
            </div>
          </div>
          <div className={styles.pointerRight}>
            <img className={styles.rlImage} src="/pointRight.svg" alt='right' />
          </div>
          <div className={styles.featuresRight}>
            <div className={styles.textDescriptionRight}>
              <h3>Documentation</h3>
              <p>Document your APIs with our super easy documenting tool which is designed by keeping work sharing in mind. Easily access and read documents so that developers can focus more on innovation rather on managing. </p>
            </div>
            <img src='/book.svg' alt='robo' />
          </div>
          <div className={styles.pointerLeft}>
            <img className={styles.lrImage} src="/pointLeft.svg" alt='right' />
          </div>
          <div className={styles.featuresLeft}>
            <img src='/calculate.svg' alt='robo' />
            <div className={styles.textDescriptionLeft}>
              <h3>Security</h3>
              <p>Password protect your data thus only you can make changes on your project and only your selected members can see it. Also, you can assign team leads who can be given acccess to makes changes on your behalf. </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.aboutUs}>
        <h1>Meet the developers</h1>
        <div className={styles.aboutUsMain}>

          <div className={styles.container}>
            <div className={styles.content}>
              {/* <h1 className={styles.title}>King 👑 </h1> */}
              <p className={styles.description}>
                CS Major (2019-23) <br/>
                Delhi Technological University <br/>
                Delhi-110042  <br/>
                <br/>
                Full stack dev.  <br/>
                Problems solving and chess are <img src='/heart.svg' alt="♥"/>.
              </p>
              <div className={styles.social}>
                <a href="mailto:vineetoli52@gmail.com"><img src="/mail.svg" alt="" /></a>
                <a href="https://github.com/goffygoo"><img src="/git.png" alt="" /></a>
                <a href="https://www.linkedin.com/in/vineet-oli-834a031b6/"><img src="/linkedin.svg" alt="" /></a>
                <a href="https://www.ewently.com"><img src="https://ewently.com/fp1/ewently.svg" alt="" /></a>
              </div>
            </div>
            <div className={styles.flap1}></div>
          </div>

          <div className={styles.container}>
            <div className={styles.content}>
              <p className={styles.description}>Software Engineering<br/>DTU23</p>
              <p className={styles.description}>Skills
              <br/>➡️Full stack developer
              <br/>➡️Problem solving
              <br/>➡️DBMS
              <br/>➡️C++ Programming
              </p>
              <div className={styles.social}>
                <a href="mailto:askhan.ak912@gmail.com"><img src="/mail.svg" alt="" /></a>
                <a href="https://github.com/redscool"><img src="/git.png" alt="" /></a>
                <a href="https://www.linkedin.com/in/asif-khan-369344196/"><img src="/linkedin.svg" alt="" /></a>
              </div>
            </div>
            <div className={styles.flap2}></div>
          </div>

          <div className={styles.container}>
            <div className={styles.content}>
            <p className={styles.description}>
              SRIB INTERN
            <br/>
              Computer Engineering
            <br/>
            DTU '23</p>
              <p className={styles.description}>Skills
              <br/>➡️C++(Proficient) ,  Python
              <br/>➡️OS , DBMS , CN
              <br/>➡️MERN STACK
              <br/>➡️DATA HANDLING
              </p>
              <div className={styles.social}>
                <a href="mailto:viditmanojpushkarna@gmail.com"><img src="/mail.svg" alt="" /></a>
                <a href="https://github.com/ViditPushkarna"><img src="/git.png" alt="" /></a>
                <a href="https://www.linkedin.com/in/vidit-pushkarna-901313197/"><img src="/linkedin.svg" alt="" /></a>
                <a href="https://leetcode.com/bottom_text"><img src="/leetcode.png" alt="" /></a>
              </div>
            </div>
            <div className={styles.flap3}></div>
          </div>
        </div>

        <div className={styles.diveIn} onClick={() => navigate('/home')}>
          <div className={styles.diveInBox}>
            <span>Dive In</span>
            <div className={styles.wave}></div>
          </div>
        </div>
      </div>

    </div>
  )
};
