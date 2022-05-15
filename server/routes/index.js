import express from "express";
import { home } from "../controllers/home_controller.js";
import user from "./user.js";
const router = express.Router();
console.log("Router loaded");

router.get("/", home);
router.use("/user", user);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
