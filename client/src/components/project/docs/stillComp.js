import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as actionDocs from "../action/actionDocs";
// import { bindActionCreators } from "redux";

export default function StillComp({ indx }) {
  const { contents } = useSelector((state) => state.docs);

  //   const dispatch = useDispatch();
  //   const { editdata } = bindActionCreators(actionDocs, dispatch);
  return (
    <div className="stillcomp">
      <textarea value={contents[indx]} readOnly={false} rows={12} cols={60} />
    </div>
  );
}
