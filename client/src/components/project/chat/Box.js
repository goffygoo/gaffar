import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as actionDocs from "../../../action/actionDocs";
import StillComp from "./stillComp";
import TextComp from "./textComp";
import styles from "../../../styles/components/project/Docs.module.css";

export default function Box({ indx }) {
  const { docs:{editable} , project:{is_admin}} = useSelector((state) => state);

  const dispatch = useDispatch();
  const { toggleedit , deleteBox } = bindActionCreators(actionDocs, dispatch);

  return (
    <div className={styles.boxContainer}>
      {is_admin ? 
      <div className={styles.btnCtn}>
      {editable[indx] ? (
        <div className={styles.save} onClick={() => toggleedit(indx)}>
           <img src="/save.svg" alt='' />
        </div>
      ) : (
        <div className={styles.edit} onClick={() => toggleedit(indx)}>
          <img src="/edit.svg" alt='' />
        </div>
      )}
        <div className={styles.delete} onClick = {()=>deleteBox(indx)}>
          <img src="/delete.svg" alt='' />
        </div>
      </div>
      : null}
      <div className={styles.title}>
        {editable[indx] ? (
          <TextComp indx={indx} typec={"title"} />
        ) : (
          <StillComp indx={indx} typec={"title"} />
        )}
      </div>
      <div className={styles.url}>
        {editable[indx] ? (
          <TextComp indx={indx} typec={"url"} />
        ) : (
          <StillComp indx={indx} typec={"url"} />
        )}
      </div>
      <div className={styles.method}>
        {editable[indx] ? (
          <TextComp indx={indx} typec={"method"} />
        ) : (
          <StillComp indx={indx} typec={"method"} />
        )}
      </div>
      <div className={styles.request}>
        {editable[indx] ? (
          <TextComp indx={indx} typec={"request"} />
        ) : (
          <StillComp indx={indx} typec={"request"} />
        )}
      </div>
      <div className={styles.response}>
        {editable[indx] ? (
          <TextComp indx={indx} typec={"response"} />
        ) : (
          <StillComp indx={indx} typec={"response"} />
        )}
      </div>
    </div>
  );
}
