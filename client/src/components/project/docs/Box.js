import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as actionDocs from "../../../action/actionDocs";
import StillComp from "./stillComp";
import TextComp from "./textComp";
import styles from "../../../styles/components/project/Docs.module.css";

export default function Box({ indx }) {
  const { editable, contents, typec } = useSelector((state) => state.docs);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { toggleedit } = bindActionCreators(actionDocs, dispatch);

  return (
    <div className={styles.boxContainer}>
      {editable[indx] ? (
        <div className={styles.save} onClick={() => toggleedit(indx)}>
          save
        </div>
      ) : (
        <div className={styles.edit} onClick={() => toggleedit(indx)}>
          edit
        </div>
      )}

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
