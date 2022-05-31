import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import * as actionDocs from "../../action/actionDocs";
import Box from "./docs/Box";
import styles from "../../styles/components/project/Docs.module.css";

export default function Docs() {
  const { docs:{contents} , project:{is_admin} } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { addbox } = bindActionCreators(actionDocs, dispatch);

  return (
    <div className={styles.outercont}>
      {is_admin ? 
      <div className={styles.addbox} onClick={() => addbox()}><p>ADDBOX</p></div>
      : null
      }
      <div className={styles.container}>
        {contents.map((_c, ind) => {
          return <Box indx={ind} key={ind} />;
        })}
      </div>
    </div>
  );
}
