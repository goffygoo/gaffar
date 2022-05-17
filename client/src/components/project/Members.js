import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as actionMembers from "../../action/actionMembers";
import styles from "../../styles/components/project/Members.module.css";

export default function Members() {
  return <div className={styles.Members}></div>;
}
