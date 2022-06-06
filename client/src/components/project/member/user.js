import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useState } from "react";
import styles from "../../../styles/components/project/member/user.module.css";
import * as actionMembers from "../../../action/actionMembers";
import config from "../../../config.json";
export default function User({ indx }) {
  const {
    member: { members },
    project: { is_admin },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { makeAdmin, changeRole } = bindActionCreators(actionMembers, dispatch);
  const [editable, seteditable] = useState(false);
  const [role, setrole] = useState("");
  return (
    <div key={`user${indx}`} className={styles.mainCtn}>
      <img
        className={styles.left}
        src={`${config.SERVER}/user/getImg?img_id=${members[indx].user_photu}`}
        alt="profile"
      />
      <div className={styles.center}>
        <div className={styles.name}>
          <p>{members[indx].user_name}</p>
        </div>
        <div className={styles.email}>
          <p>{members[indx].user_email}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.upper}>
          {editable ? (
            <input value={role} onChange={(e) => setrole(e.target.value)} />
          ) : (
            <p>{members[indx].user_role}</p>
          )}
        </div>

        {is_admin ? (
          <div className={styles.lower}>
            <div className={styles.edit} onClick={() => seteditable(!editable)}>
              <p>{editable ? "Cancel" : "Edit"}</p>
            </div>
            <div
              className={styles.save}
              onClick={() => {
                changeRole(indx, role);
                seteditable(false);
              }}
            >
              {" "}
              <p>Save</p>
            </div>
            {members[indx].is_admin ? (
              <div className={styles.makeadmin}>
                <p>Admin</p>
              </div>
            ) : (
              <div className={styles.makeadmin} onClick={() => makeAdmin(indx)}>
                <p>Makeadmin</p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
