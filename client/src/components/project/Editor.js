import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"
import * as actionEditor from "../../action/actionEditor.js";
import styles from "../../styles/components/project/Editor.module.css";

export default function Editor({ socket }) {

  const { login: { user }, project: { project_id, is_admin },
    editor: { contents } } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { setQuillData, saveQuillData } = bindActionCreators(actionEditor, dispatch);

  const [quill, setQuill] = useState();

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, { modules: { ...(!is_admin && ({ toolbar: false })) }, theme: 'snow' });
    q.setContents(contents)
    if (!is_admin) q.disable()
    else if (is_admin) q.enable()
    setQuill(q);
  }, [is_admin])

  useEffect(() => {
    if (socket == null || quill == null || socket.connected === false) return

    const socketHandler = (data) => {
      quill.updateContents(data.delta);
    }
    const syncData = (data) => {
      quill.setContents(data.contents);
    }
    socket.on("receive-changes", socketHandler)
    socket.on("sync-data", syncData)
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null || socket.connected === false) return

    const quillHandler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", { delta, project_id, id: user.id, contents: quill.getContents() })
      setQuillData(quill.getContents())
    }
    quill.on("text-change", quillHandler)

    return () => {
      quill.off("text-change", quillHandler)
    }
  }, [socket, quill, project_id, user])

  if (!socket || socket.connected === false) {
    return (<h1>LOADING...</h1>);
  }

  const sync = () => {
    if (socket == null || quill == null || socket.connected === false) return
    socket.emit("current-editor-contents", { contents: quill.getContents(), project_id })
  }

  const save = () => {
    if (quill == null) return
    saveQuillData(quill.getContents())
  }

  return (
    <div className={styles.outercont}>
      {
        is_admin ?
          <div className={styles.controlBar}>
            <div className={styles.syncBtn} onClick={() => sync()}><p>Sync</p></div>
            <div className={styles.saveBtn} onClick={() => save()}><p>Save</p></div>
          </div>
          : null
      }
      <div id="container" className={styles.editorContainer} ref={wrapperRef}>
      </div>
    </div>
  );
}
