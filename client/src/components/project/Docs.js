import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as actionDocs from "../../action/actionDocs";
import StillComp from "./docs/stillComp";
import TextComp from "./docs/textComp";
import styles from "../../styles/components/project/Docs.module.css";

export default function Docs() {
  const { editable, contents, typec } = useSelector((state) => state.docs);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { toggleedit, addbox, settypec, removebox, getdocs } =
    bindActionCreators(actionDocs, dispatch);

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div id="typec">
          {editable ? (
            <form>
              <select
                id="selectlang"
                value={typec}
                onChange={(e) => settypec(e.target.value)}
              >
                <option value="title">title</option>
                <option value="url">url</option>
                <option value="method">method</option>
                <option value="request">request</option>
                <option value="response">response</option>
              </select>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addbox();
                }}
              >
                {" "}
                Add Box{" "}
              </button>
            </form>
          ) : null}
        </div>
        <div id="savedit">
          <button onClick={() => toggleedit(editable)}>
            {editable ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      {contents.map((c, ind) => {
        return (
          <div className={styles.docCon}>
            {editable ? <TextComp indx={ind} /> : <StillComp indx={ind} />}
            {editable ? (
              <button
                onClick={(e) => {
                  console.log(ind);
                  e.preventDefault();
                  removebox(ind);
                }}
              >
                X
              </button>
            ) : null}
          </div>
        );
      })}

      <br />
    </div>
  );
}
