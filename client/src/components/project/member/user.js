import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/components/member/user.module.css";
export default function User({ indx }) {
  const { members } = useSelector((state) => state.member);

  return (
    <div className={styles.mainCtn}>
      <div className={styles.left}></div>
      <div className={styles.center}>
        <div className={styles.name}>{members[indx].user_name}</div>
        <div className={styles.email}>{members[indx].user_email}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.upper}></div>
        <div className={styles.lower}>
          <div className={styles.edit}></div>
          <div className={styles.save}></div>
          <div className={styles.makeadmin}></div>
        </div>
      </div>
      <div className={styles.kickBtn}></div>
    </div>
  );
}
