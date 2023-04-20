import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actionProject from "../../action/actionProject";
import { bindActionCreators } from "redux";
import styles from "../../styles/components/home/Project.module.css";
export default function Project({ indx }) {
  const { projects } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { initProject } = bindActionCreators(actionProject, dispatch);

  return (
    <div
      className={styles.container}
      onClick={(_e) => {
        navigate(`/project/${projects[indx].project_id}/list`);
      }}
    >
      <p>{projects[indx].project_name}</p>
    </div>
  );
}
