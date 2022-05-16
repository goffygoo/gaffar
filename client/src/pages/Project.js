import React from 'react'
import Branding from '../components/Branding'
import styles from '../styles/pages/Project.module.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Tabs from '../components/project/Tabs';
import List from '../components/project/List'
import Board from '../components/project/Board'
import Docs from '../components/project/Docs'
import Extras from '../components/project/Extras'
import Members from '../components/project/Members'
import Mytasks from '../components/project/Mytasks'

export default function Project() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.navbar}>
        <Branding />

        <Tabs name="List" link="list" navigate={navigate}/>
        <Tabs name="Board" link="board" navigate={navigate}/>
        <Tabs name="Docs" link="docs" navigate={navigate}/>
        <Tabs name="Members" link="members" navigate={navigate}/>
        <Tabs name="Mytasks" link="mytasks" navigate={navigate}/>
        <Tabs name="Extras" link="extras" navigate={navigate}/>

      </div>

      <div className={styles.content}>
        <div className={styles.titlebar}>
          <h1>Title</h1>
        </div>
        
          <Routes>
            <Route exact path='/list' element={<List/>}/>
            <Route exact path='/board' element={<Board/>}/>
            <Route exact path='/docs' element={<Docs/>}/>
            <Route exact path='/members' element={<Members/>}/>
            <Route exact path='/mytasks' element={<Mytasks/>}/>
            <Route exact path='/extras' element={<Extras/>}/>
            <Route path='/*' element={<Navigate to="/page_not_found"/>}/>
          </Routes>
        
      </div>

    </div>
  )
}
