import React from "react";
import styles from "../../styles/components/home/Invite.module.css";
export default function Project(props) {
  const { id, name, accept, reject } = props;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <p>{name}</p>
      </div>
      <div className={styles.acceptBtn} onClick={() => accept(id, name)}>
        <img src = "tick1.png" alt = ''/>
      </div>
      <div className={styles.rejectBtn} onClick={() => reject(id, name)}>
      <img src = "cross_white.png" alt = ''/>
      </div>
    </div>
  );
}
