import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Quill from 'quill'
import "quill/dist/quill.snow.css"
// import { io } from "socket.io-client";
import config from "../../config.json";

import * as actionEditor from "../../action/actionEditor.js";
// import Box from "./docs/Box";
// import styles from "../../styles/components/project/Docs.module.css";

export default function Editor({ socket }) {

  const { login: { user }, project: { project_id },
    editor: { contents } } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { setQuillData } = bindActionCreators(actionEditor, dispatch);

  const [quill, setQuill] = useState();

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, { theme: 'snow' });
    q.setContents(contents)
    setQuill(q);
  }, [])

  useEffect(() => {
    if (socket == null || quill == null || socket.connected === false) return

    const socketHandler = (data) => {
      // console.log("---- socket changes recieved ---")
      // console.log(data.delta)
      quill.updateContents(data.delta)
    }
    socket.on("receive-changes", socketHandler)

    // return () => {
    //   socket.off("receive-changes", socketHandler)
    // }
  }, [socket, quill])



  useEffect(() => {
    if (socket == null || quill == null || socket.connected === false) return

    const quillHandler = (delta, oldDelta, source) => {
      if (source !== "user") return
      // console.log("---- text change by user ---")
      socket.emit("send-changes", { delta, project_id, id: user.id, contents: quill.getContents() })
      // console.log(delta)
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

  // const quillHandler = (delta, oldDelta, source) => {
  //   if (source !== "user") return
  //   console.log("---- text change by user ---")
  //   socket.emit("send-changes", { delta, project_id, id: user.id })
  //   console.log(delta)
  // }
  // const socketHandler = (data) => {
  //   console.log("---- socket changes recieved ---")
  //   console.log(data.delta)
  //   quill.updateContents(data.delta)
  // }

  // if (quill) {
  //   socket.on("receive-changes", socketHandler)
  //   quill.on("text-change", quillHandler);
  // }

  return (
    <div id="container" ref={wrapperRef}>
      {/* hi ji this is editor */}
    </div>
  );
}
