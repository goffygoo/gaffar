import React from 'react'
import styles from '../../../styles/components/project/board/Task.module.css'

export default function Task(props) {
    const {
        view
    } = props

    return (
        <div className={styles.containerPopup}>
            <div className={styles.popup}>
                <img src="/cancelButton.svg" alt='cancel' onClick={() => view(false)} />
               
            </div>
        </div>
    )
}
