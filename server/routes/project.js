import express from "express";
import passport from "passport";
import "../config/passport.js";
import home from "../controllers/project_controller.js";
import { adminAccess, logger2 } from "../config/middleware.js";

export default function (io) {
  const router = express.Router();
  console.log("Project Router loaded");

  router.get("/", home(io).home);
  router.post("/createProject", home(io).createProject);
  router.post("/getProjects", home(io).getProject);
  router.post("/getUsers", home(io).getUsers);
  router.post(
    "/getInfo",
    passport.authenticate("jwt", { session: false }),
    logger2,
    home(io).getInfo
  );
  router.post(
    "/invite",
    passport.authenticate("jwt", { session: false }),
    adminAccess,
    home(io).invite
  );
  router.post(
    "/makeAdmin",
    passport.authenticate("jwt", { session: false }),
    adminAccess,
    home(io).makeAdmin
  );
  router.post(
    "/changeRole",
    passport.authenticate("jwt", { session: false }),
    adminAccess,
    home(io).changeRole
  );
  router.post(
    "/saveExtras",
    passport.authenticate("jwt", { session: false }),
    adminAccess,
    home(io).saveExtras
  );
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
