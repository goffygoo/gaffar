import express from "express";
import passport from "passport";
import "../config/passport.js";
import home from "../controllers/message_controller.js"
import { adminAccess } from "../config/middleware.js";

export default function (io) {
  const router = express.Router();
  console.log("Message Router loaded");

  router.get("/", home(io).home);
  router.post("/createmessage", home(io).createMessage);
  router.post("/fetchallmsg", home(io).fetchAllMess);
  router.post("/deletemessage", home(io).deleteMessage);
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
