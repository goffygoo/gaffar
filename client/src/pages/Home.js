import React, { useState, useEffect } from "react";
import Branding from "../components/Branding";
import Project from "../components/home/Project";
import Invite from "../components/home/Invite";
import UploadImg from "../components/home/upload";
import styles from "../styles/pages/Home.module.css";
import axios from "axios";
import config from "../config.json";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as actionHome from "../action/actionHome";
import * as actionLogin from "../action/actionLogin";

export default function Home() {
  const {
    home: { pname, projects },
    login: { user },
  } = useSelector((state) => state);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    addProject,
    pnamechange,
    initUser,
    getprojects,
    rename,
    updateimg,
    acceptInv,
    rejectInv,
  } = bindActionCreators(Object.assign({}, actionHome, actionLogin), dispatch);

  const [editable, seteditable] = useState(false);
  const [text, settext] = useState("");
  const [popup, setpopup] = useState(false);
  const [imgdata, setimgdata] = useState();

  useEffect(() => {
    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("token") === null
    )
      return navigate("/login");
    const user_email = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    const req = {
      user_email: user_email,
    };

    axios
      .post(config.SERVER + "/user/getInfo", req, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.success === false) throw Error("Error");

        initUser(res.data.user, token);
        getprojects();
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data === "Unauthorized")
          return navigate("/login");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {popup ? (
        <UploadImg
          show={setpopup}
          ratio={1}
          setUploadData={setimgdata}
          updateimg={updateimg}
        />
      ) : null}

      <div className={styles.page}>
        <div className={styles.topArea}>
          <Branding height="10vh" />
          <div className={styles.pageheading}>
            <h1> Dashboard</h1>
          </div>
          <div
            className={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");

              navigate("/login");
            }}
          >
            <p>Log Out</p>
          </div>
        </div>
        <div className={styles.mainWindow}>
          <div className={styles.mainContainer}>
            <div className={styles.projectsContainer}>
              <div className={styles.projectHeading}>
                <h2>Your Projects</h2>
              </div>
              <div className={styles.projectCtn}>
                {projects.map((p, ind) => {
                  return <Project indx={ind} key={ind} />;
                })}
              </div>
            </div>
            <div className={styles.addProject}>
              <div className={styles.projectNameInput}>
                <input
                  placeholder="Project Name"
                  className={styles.projectName}
                  value={pname}
                  onChange={(e) => {
                    if (e.target.value.length > 40) return;
                    pnamechange(e.target.value);
                  }}
                  spellCheck="false"
                />
              </div>
              <div
                className={styles.addProjectBtn}
                onClick={() => addProject()}
              >
                <p>Add Project</p>
              </div>
            </div>
            <div className={styles.invitesContainer}>
              <div className={styles.projectHeading}>
                <h2>Invites</h2>
              </div>
              <div className={styles.inviteCtn}>
                {user.invites.map((e) => {
                  return (
                    <Invite
                      key={e.project_id}
                      id={e.project_id}
                      name={e.project_name}
                      accept={acceptInv}
                      reject={rejectInv}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <h1>Your Profile</h1>
            </div>
            <div className={styles.profilePicture}>
              <img
                src={
                  imgdata === undefined && user.img !== undefined
                    ? `${config.SERVER}/user/getImg?img_id=${user.img}`
                    : imgdata
                }
                alt="profile"
                className={styles.picture}
                onClick={() => setpopup(true)}
              />
            </div>
            {editable ? (
              <input
                type="text"
                value={text}
                onChange={(e) => {
                  if (e.target.value.length > 25) return;
                  settext(e.target.value);
                }}
                className={styles.usernameInput}
                spellCheck="false"
              ></input>
            ) : (
              <div className={styles.username}>
                <p>{user.name}</p>
              </div>
            )}
            <div className={styles.buttonContainer}>
              <div
                className={styles.edit}
                onClick={(_e) => seteditable((val) => !val)}
              >
                <p>{editable ? "Cancel" : "Edit"}</p>
              </div>
              <div
                className={styles.update}
                onClick={(e) => {
                  if (text) {
                    rename(text);
                    seteditable(false);

                    settext("");
                  }
                }}
              >
                <p>Update</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
