import React, { useEffect } from "react";
import Branding from "../components/Branding";
import styles from "../styles/pages/Project.module.css";
import config from "../config.json";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Tabs from "../components/project/Tabs";
import List from "../components/project/List";
import Board from "../components/project/Board";
import Docs from "../components/project/Docs";
import Extras from "../components/project/Extras";
import Members from "../components/project/Members";
import Mytasks from "../components/project/Mytasks";
import axios from "axios";
import io from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import * as actionLogin from "../action/actionLogin";
import * as actionProject from "../action/actionProject";

export default function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, project_name } = useSelector((state) => state.project);

  const { initUser, initProject, getDocs, getList, getMembers, changeExtra } =
    bindActionCreators({ ...actionLogin, ...actionProject }, dispatch);

  const params = useParams();

  useEffect(() => {
    if (error === true) return navigate("/home");
  }, [error]);

  useEffect(() => {
    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("token") === null
    )
      return navigate("/home");

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
        initProject(params.id.slice(1), user_email);
      })
      .catch((err) => {
        console.log(err);
        navigate("/home");
      });

    const socket = io(config.SERVER + "/");

    initSocket(socket);

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initSocket = (socket) => {
    socket.emit("join", params.id.slice(1));

    socket.on("getDocs", () => {
      console.log("Socket informs: Docs Changed");
      getDocs();
    });

    socket.on("getList", (data) => {
      console.log("Socket informs: List Changed");
      getList(data.list, data.tasks);
    });

    socket.on("getUsers", (data) => {
      console.log("Sockets inform: Members List Changed");
      getMembers();
    });

    socket.on("getExtras", (data) => {
      console.log("Sockets inform: Extras Added");
      changeExtra(data);
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.titlebar}>
        <Branding />

        <h1>{project_name.toUpperCase()}</h1>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.navbar}>
          <Tabs
            name="List"
            link={`${params.id}/list`}
            selected={params["*"] === "list"}
            navigate={navigate}
          />
          <Tabs
            name="Board"
            link={`${params.id}/board`}
            selected={params["*"] === "board"}
            navigate={navigate}
          />
          <Tabs
            name="Docs"
            link={`${params.id}/docs`}
            selected={params["*"] === "docs"}
            navigate={navigate}
          />
          <Tabs
            name="Members"
            link={`${params.id}/members`}
            selected={params["*"] === "members"}
            navigate={navigate}
          />
          <Tabs
            name="Mytasks"
            link={`${params.id}/mytasks`}
            selected={params["*"] === "mytasks"}
            navigate={navigate}
          />
          <Tabs
            name="Extras"
            link={`${params.id}/extras`}
            selected={params["*"] === "extras"}
            navigate={navigate}
          />
        </div>

        <div className={styles.content}>
          <Routes>
            <Route exact path="/list" element={<List />} />
            <Route exact path="/board" element={<Board />} />
            <Route exact path="/docs" element={<Docs />} />
            <Route exact path="/members" element={<Members />} />
            <Route exact path="/mytasks" element={<Mytasks />} />
            <Route exact path="/extras" element={<Extras />} />
            <Route path="/*" element={<Navigate to="/page_not_found" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
