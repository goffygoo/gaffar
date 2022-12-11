import express from "express";
import passport from "passport";
import "../config/passport.js";
import home from "../controllers/editor_contoller.js"
import { adminAccess } from "../config/middleware.js";

export default function (io) {
  const router = express.Router();
  console.log("Editor Router loaded");

  router.get("/", home(io).home);
  router.post(
    "/saveEditor",
    passport.authenticate("jwt", { session: false }),
    adminAccess,
    home(io).saveEditor
  );
  // router.post("/login", login);
  // for any further routes, access from here
  // router.use('/routerName', require('./route'));
  return router;
}
