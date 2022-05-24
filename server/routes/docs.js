import express from "express";
import passport from "passport";
import "../config/passport.js";
import home from "../controllers/docs_controller.js";

export default function (io) {
  const router = express.Router();
  console.log("Docs Router loaded");

  router.get("/", home(io).home);
  router.post("/getDocs", home(io).getDocs);
  router.post("/saveBox", home(io).saveBox);
  router.post("/addBox", home(io).addBox);
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
