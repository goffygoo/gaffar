import express from "express";
import passport from "passport";
import "../config/passport.js";
import { createProject, home } from "../controllers/project_controller.js";
const router = express.Router();
console.log("Project Router loaded");

router.get("/", home);
router.post("/createProject", createProject);
// router.post("/createUser", createUser);
// router.post(
//   "/userInfo",
//   passport.authenticate("jwt", { session: false }),
//   userInfo
// );
// router.post("/login", login);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
