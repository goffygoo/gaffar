import React from 'react'
import styles from '../styles/pages/LandingPage.module.css'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.ctn}>
      <div className={styles.header}>
        <img className={styles.curve1} src="/curve1.svg" alt="" />
        <div className={styles.headerContent}>
          <div className={styles.headertext}>
            <div className={styles.logo}><img src="/logo.svg" alt='logo' /></div>
            <div className={styles.heading}><p>Get it Done</p></div>
            <div className={styles.subheading}>
              <p>
                Tired of hectic work of managing projects and teams all the time? <br />
                Needed a tool to manage all your works at one place ? <br />
                Get it done with Gaffer<br />
                With our easy to use user interface and highly secure platform, <br/>
                keep everything in order and save your precious time <br />
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
          <p>Track progress using our highly intractive board which provides fully flexible cloumns, and advanced task management</p>
        </div>
        <img src="/board.png" alt='board' />
      </div>

      <div className={styles.sec3}>
        <h1>Vibsjain</h1>
        <div className={styles.featuresLeft}>
          <img src='/robo.svg' alt='robo' />
          <div className={styles.textDescriptionLeft}><h3>List</h3><p>This feature is used for bania</p></div>
        </div>
        <div className={styles.pointerRight}>
          <img src="/pointRight.svg" alt='right' />
          <div></div>
        </div>
        <div className={styles.featuresRight}>
          <div className={styles.textDescriptionLeft}><h3>List</h3><p>This feature is used for bania</p></div>
          <img src='/robo.svg' alt='robo' />
        </div>
        <div className={styles.pointerLeft}>
          <div></div>
          <img src="/pointLeft.svg" alt='right' />
        </div>
        <div className={styles.featuresLeft}>
          <img src='/robo.svg' alt='robo' />
          <div className={styles.textDescriptionLeft}><h3>List</h3><p>This feature is used for bania</p></div>
        </div>
        <div className={styles.pointerRight}>
          <img src="/pointRight.svg" alt='right' />
          <div></div>
        </div>
        <div className={styles.featuresRight}>
          <div className={styles.textDescriptionLeft}><h3>List</h3><p>This feature is used for bania</p></div>
          <img src='/robo.svg' alt='robo' />
        </div>

      </div>

      <div className={styles.aboutUs}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>King</h1>
            <p className={styles.description}>What else you want to know!</p>
          </div>
          <div className={styles.flap}></div>
        </div>

        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>King</h1>
            <p className={styles.description}>What else you want to know!</p>
          </div>
          <div className={styles.flap}></div>
        </div>

        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>King</h1>
            <p className={styles.description}>What else you want to know!</p>
          </div>
          <div className={styles.flap}></div>
        </div>


      </div>
    </div>
  )
}
