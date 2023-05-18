import React, { useState } from "react";
import { useSelector } from "react-redux";
import User from "./member/user";
import styles from "../../styles/components/project/Members.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
export default function Members() {
  const {
    member: { members },
    login: { user, token },
    project: { is_admin },
  } = useSelector((state) => state);

  const [text, settext] = useState("");
  const [msg, setmsg] = useState();

  const params = useParams();

  const invite = () => {
    const req = {
      project_id: params.id,
      new_user_email: text,
      user_email: user.email,
    };

    axios
      .post(config.SERVER + "/project/invite", req, {
        headers: {
          Authorization: token,
        },
      })
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
      <p className={styles.errorMessage}>{msg}</p>
      {is_admin ? (
        <div className={styles.addMemberCtn}>
          <input
            placeholder="Member email goes here..."
            className={styles.membernameInput}
            value={text}
            onChange={(e) => settext(e.target.value)}
          ></input>
          <div className={styles.addMemberBtn} onClick={() => invite()}>
            <p>Add Member</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
