import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
// import "../../styles/docs.css";

import * as actionDocs from "../../action/actionDocs";
import StillComp from "./docs/stillComp";
import TextComp from "./docs/textComp";

export default function Docs() {
  const { editable, contents, typec } = useSelector((state) => state.docs);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { toggleedit, addbox, settypec } = bindActionCreators(
    actionDocs,
    dispatch
  );

  return (
    <div className="container">
      {contents.map((c, ind) => {
        return editable ? <TextComp indx={ind} /> : <StillComp indx={ind} />;
      })}

      <button onClick={() => toggleedit(editable)}>
        {editable ? "Save" : "Edit"}
      </button>
      <br />

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
  );
}
