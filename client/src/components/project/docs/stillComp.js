import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as actionDocs from "../action/actionDocs";
// import { bindActionCreators } from "redux";
import styles from "../../../styles/components/project/Docs.module.css";

export default function StillComp({ indx, typec }) {
  const { contents } = useSelector((state) => state.docs);

  //   const dispatch = useDispatch();
  //   const { editdata } = bindActionCreators(actionDocs, dispatch);
  return (
    <div className={styles.stillcomp}>
      {typec.toUpperCase()} :{" "}
      {typec === "response" || typec === "request" ? (
        <div>{contents[indx][typec]}</div>
      ) : (
        contents[indx][typec]
      )}
    </div>
  );
}
