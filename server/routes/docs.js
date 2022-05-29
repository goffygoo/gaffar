import express from "express";
import passport from "passport";
import "../config/passport.js";
import home from "../controllers/docs_controller.js";
import {adminAccess} from '../config/middleware.js'

export default function (io) {
  const router = express.Router();
  console.log("Docs Router loaded");

  router.get("/", home(io).home);
  router.post("/getDocs", home(io).getDocs);
  router.post("/saveBox",adminAccess, home(io).saveBox);
  router.post("/addBox", adminAccess,home(io).addBox);
  router.post("/deleteBox", adminAccess,home(io).deleteBox);
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
