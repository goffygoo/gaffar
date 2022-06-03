import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionDocs from "../../../action/actionDocs";
import { bindActionCreators } from "redux";
import styles from "../../../styles/components/project/Docs.module.css";

export default function TextComp({ indx, typec }) {
  const { contents } = useSelector((state) => state.docs);

  const dispatch = useDispatch();
  const { editdata } = bindActionCreators(actionDocs, dispatch);
  return (
    <div className={styles.textcomp}>
      <p>{typec.toUpperCase() + " : "}</p>
      {typec === "response" || typec === "request" ? (
        <textarea
          className={styles.textcomparea}
          value={contents[indx][typec]}
          spellCheck="false"
          onChange={(e) => editdata(e.target.value, indx, typec)}
        />
      ) : (
        <input
          className={`${styles.textcomparea}`}
          value={contents[indx][typec]}
          spellCheck="false"
          onChange={(e) => editdata(e.target.value, indx, typec)}
        />
      )}
    </div>
  );
}
