import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionDocs from "../../../action/actionDocs";
import { bindActionCreators } from "redux";
import "../../../styles/components/project/Docs.module.css";

export default function TextComp({ indx }) {
  const { contents } = useSelector((state) => state.docs);

  const dispatch = useDispatch();
  const { editdata } = bindActionCreators(actionDocs, dispatch);
  return (
    <div className="textcomp">
      <textarea
        value={contents[indx]}
        onChange={(e) => editdata(e.target.value, indx)}
        rows={12}
        cols={60}
      />
    </div>
  );
}
