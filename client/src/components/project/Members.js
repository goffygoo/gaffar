import React, { useState } from "react";
import { useSelector } from "react-redux";
import User from "./member/user";
import styles from "../../styles/components/project/Members.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Members() {
  const { member:{members} , login:{user}  } = useSelector((state) => state);

  const [text, settext] = useState("");
  const [msg, setmsg] = useState();

  const params = useParams();

  const invite = () => {
    const req = {
      project_id: params.id.slice(1),
      new_user_email: text,
      user_email:user.email
    };

    axios
      .post("http://localhost:5000/project/invite", req)
      .then((res) => {
        if (res.data.message) setmsg(res.data.message);
        settext("");
      })
      .catch((err) => {
        if (err.response.data.message) setmsg(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className={styles.members}>
      <div className={styles.membersCtn}>
        {members.map((mem, ind) => {
          return <User indx={ind} key={ind} />;
        })}
      </div>
      <div className={styles.addMemberCtn}>
        <div className={styles.membername}>
          <input
            className={styles.membernameInput}
            value={text}
            onChange={(e) => settext(e.target.value)}
          ></input>
        </div>
        <div className={styles.addMemberBtn} onClick={() => invite()}>
          <p>Add Member</p>
        </div>
        {msg ? <p>{msg}</p> : null}
      </div>
    </div>
  );
}
