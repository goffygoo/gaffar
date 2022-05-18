import express from "express";
import passport from "passport";
import "../config/passport.js";
import { createUser, home, login } from "../controllers/user_controller.js";
const router = express.Router();
console.log("User Router loaded");

router.post("/redskull");

router.get("/", home);
router.post("/createUser", createUser);
// router.post(
//   "/userInfo",
//   passport.authenticate("jwt", { session: false }),
//   userInfo
// );
router.post("/login", login);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
