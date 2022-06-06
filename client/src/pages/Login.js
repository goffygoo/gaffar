import React from "react";
import styles from "../styles/pages/Login.module.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionTest from "../action/actionLogin";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    setsusername,
    setsemail,
    setspassword,
    signup,
    setlemail,
    setlpassword,
    login,
  } = bindActionCreators(actionTest, dispatch);

  const navigate = useNavigate();

  return (
    <>
      <link
        href={`https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap`}
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
      />
      <div className={styles.main_container}>
        <div className={styles.main}>
          <input
            type="checkbox"
            id="chk"
            className={`${styles.chk}`}
            aria-hidden="true"
          ></input>

          <div className={styles.signup}>
            <form>
              <label className={styles.label} htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <div className={styles.input_fields_login}>
                <label htmlFor="username" className={styles.icons}>
                  <i className={`zmdi zmdi-account zmdi-hc-2x`}></i>
                </label>
                <input
                  onChange={(e) => setsusername(e.target.value)}
                  type="text"
                  name="txt"
                  placeholder="User name"
                  required=""
                  className={styles.input}
                ></input>
              </div>
              <div className={styles.input_fields_login}>
                <label htmlFor="username" className={styles.icons}>
                  <i className={`zmdi zmdi-email zmdi-hc-2x`}></i>
                </label>
                <input
                  onChange={(e) => setsemail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                  className={styles.input}
                ></input>
              </div>
              <div className={styles.input_fields_login}>
                <label htmlFor="password" className={styles.icons}>
                  <i className={`zmdi zmdi-key zmdi-hc-2x`}></i>
                </label>
                <input
                  onChange={(e) => setspassword(e.target.value)}
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                  className={styles.input}
                ></input>
              </div>
              <button
                className={styles.button}
                onClick={(e) => signup(e, navigate)}
              >
                Sign up
              </button>
            </form>
          </div>

          <div className={styles.login}>
            <form>
              <label className={styles.label} htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <div className={styles.input_fields}>
                <label htmlFor="password" className={styles.icons}>
                  <i className={`zmdi zmdi-email zmdi-hc-2x`}></i>
                </label>
                <input
                  onChange={(e) => setlemail(e.target.value)}
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email"
                  spellCheck="false"
                  required=""
                ></input>
              </div>
              <div className={styles.input_fields}>
                <label htmlFor="password" className={styles.icons}>
                  <i className={`zmdi zmdi-key zmdi-hc-2x`}></i>
                </label>
                <input
                  onChange={(e) => setlpassword(e.target.value)}
                  className={styles.input}
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                ></input>
              </div>
              <button
                className={styles.button}
                onClick={(e) => login(e, navigate)}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
