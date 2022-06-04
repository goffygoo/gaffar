import express from "express";
import passport from "passport";
import "../config/passport.js";
import home from "../controllers/user_controller.js";

export default function (io) {
  const router = express.Router();
  console.log("User Router loaded");

  // router.post("/redskull");

  router.get("/", home(io).home);
  router.post("/createUser", home(io).createUser);
  // router.post(
  //   "/userInfo",
  //   passport.authenticate("jwt", { session: false }),
  //   userInfo
  // );
  router.post("/login", home(io).login);
  router.post(
    "/updatePP",
    passport.authenticate("jwt", { session: false }),
    home(io).updatePP
  );
  router.post("/updateName", home(io).updatename);
  router.post(
    "/getInfo",
    passport.authenticate("jwt", { session: false }),
    home(io).getInfo
  );
  router.post(
    "/acceptInvite",
    passport.authenticate("jwt", { session: false }),
    home(io).acceptInvite
  );
  router.post(
    "/rejectInvite",
    passport.authenticate("jwt", { session: false }),
    home(io).rejectInvite
  );
  router.get("/getImg", home(io).getImg);
  return router;
}

// for any further routes, access from here
// router.use('/routerName', require('./route'));
