import React, { useState, useEffect } from "react";
import styles from "../../styles/components/project/Extras.module.css";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as actionProject from "../../action/actionProject";

export default function Extras() {
  const dispatch = useDispatch();
  const { saveExtras, setExtra } = bindActionCreators(actionProject, dispatch);
  const {
    project: { gitLink, discLink, resources, notes },
    project: { is_admin },
  } = useSelector((state) => state);

  const [edit, setedit] = useState(false);

  return (
    <div className={styles.scroll}>
      <div className={styles.mainCtn}>
        <div className={styles.component}>
          <div className={styles.first}>
            <div className={styles.title}>
              <p>GitHub</p>
            </div>
            {is_admin ? (
              <>
                <div
                  className={styles.editBtn}
                  onClick={() => {
                    {
                      if (edit === "github") setedit(false);
                      else setedit("github");
                    }
                  }}
                >
                  <p>{edit === "github" ? "Cancel" : "Edit"}</p>
                </div>
                <div
                  className={styles.saveBtn}
                  onClick={() => {
                    saveExtras();
                    setedit(false);
                  }}
                >
                  <p>Save</p>
                </div>
              </>
            ) : null}
          </div>
          {edit === "github" ? (
            <input
              spellCheck="false"
              className={styles.input}
              value={gitLink}
              onChange={(e) => setExtra("gitLink", e.target.value)}
            />
          ) : (
            <div className={styles.content}>
              <p>
                <a href={gitLink}>{gitLink}</a>
              </p>
            </div>
          )}
        </div>
        <div className={styles.component}>
          <div className={styles.first}>
            <div className={styles.title}>
              <p>Discode</p>
            </div>
            {is_admin ? (
              <>
                <div
                  className={styles.editBtn}
                  onClick={() => {
                    {
                      if (edit === "discode") setedit(false);
                      else setedit("discode");
                    }
                  }}
                >
                  <p>{edit === "discode" ? "Cancel" : "Edit"}</p>
                </div>
                <div
                  className={styles.saveBtn}
                  onClick={() => {
                    saveExtras();
                    setedit(false);
                  }}
                >
                  <p>Save</p>
                </div>
              </>
            ) : null}
          </div>
          {edit === "discode" ? (
            <input
              spellCheck="false"
              className={styles.input}
              value={discLink}
              onChange={(e) => setExtra("discLink", e.target.value)}
            />
          ) : (
            <div className={styles.content}>
              <p>{discLink}</p>
            </div>
          )}
        </div>
        <div className={styles.component2}>
          <div className={styles.first}>
            <div className={styles.title}>
              <p>Resources</p>
            </div>
            {is_admin ? (
              <>
                <div
                  className={styles.editBtn}
                  onClick={() => {
                    {
                      if (edit === "resources") setedit(false);
                      else setedit("resources");
                    }
                  }}
                >
                  <p>{edit === "resources" ? "Cancel" : "Edit"}</p>
                </div>
                <div
                  className={styles.saveBtn}
                  onClick={() => {
                    saveExtras();
                    setedit(false);
                  }}
                >
                  <p>Save</p>
                </div>
              </>
            ) : null}
          </div>
          {edit === "resources" ? (
            <div className={styles.textarea}>
              <textarea
                spellCheck="false"
                value={resources}
                onChange={(e) => setExtra("resources", e.target.value)}
              />
            </div>
          ) : (
            <div className={styles.content}>
              <p>{resources}</p>
            </div>
          )}
        </div>
        <div className={styles.component2}>
          <div className={styles.first}>
            <div className={styles.title}>
              <p>Notes</p>
            </div>
            {is_admin ? (
              <>
                <div
                  className={styles.editBtn}
                  onClick={() => {
                    {
                      if (edit === "notes") setedit(false);
                      else setedit("notes");
                    }
                  }}
                >
                  <p>{edit === "notes" ? "Cancel" : "Edit"}</p>
                </div>
                <div
                  className={styles.saveBtn}
                  onClick={() => {
                    saveExtras();
                    setedit(false);
                  }}
                >
                  <p>Save</p>
                </div>
              </>
            ) : null}
          </div>
          {edit === "notes" ? (
            <div className={styles.textarea}>
              <textarea
                spellCheck="false"
                value={notes}
                onChange={(e) => setExtra("notes", e.target.value)}
              />
            </div>
          ) : (
            <div className={styles.content}>
              <p>{notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
