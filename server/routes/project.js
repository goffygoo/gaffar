import express from "express";
import passport from "passport";
import "../config/passport.js";
import home from "../controllers/project_controller.js";

export default function (io) {
  const router = express.Router();
  console.log("Project Router loaded");

  router.get("/", home(io).home);
  router.post("/createProject", home(io).createProject);
  router.post("/getProjects", home(io).getProject);
  router.post("/getUsers", home(io).getUsers);
  router.post("/getInfo", home(io).getInfo);
  router.post("/invite", home(io).invite);
  router.post("/makeAdmin", home(io).makeAdmin);
  router.post("/changeRole", home(io).changeRole);
  router.post("/saveExtras", home(io).saveExtras);
  // router.post("/createUser", createUser);
  // router.post(
  //   "/userInfo",
  //   passport.authenticate("jwt", { session: false }),
  //   userInfo
  // );
  // router.post("/login", login);
  // for any further routes, access from here
  // router.use('/routerName', require('./route'));
  return router;
}
