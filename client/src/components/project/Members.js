import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import User from "./member/user";
import * as actionMembers from "../../action/actionMembers";
import styles from "../../styles/components/project/Members.module.css";

export default function Members() {
  const { members } = useSelector((state) => state.member);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { getusers } = bindActionCreators(actionMembers, dispatch);

  useEffect(() => {
    getusers();
  }, []);

  return (
    <div className={styles.Members}>
      <div className={styles.title}>Members</div>
      {members.map((mem, ind) => {
        return <User indx={ind} key={ind} />;
      })}
      {/* <User></User> */}
    </div>
  );
}
