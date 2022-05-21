import React from "react";
import styles from "../styles/components/branding.module.css";
import { useNavigate } from "react-router-dom";

export default function Branding(props) {
  const navigate = useNavigate();
  const { height = "8vh", width = "10vw" } = props;

  return (
    <div
      className={styles.container}
      style={{ height, width }}
      onClick={(_e) => navigate("/home")}
    ></div>
  );
}
