import express from "express";
import home from "../controllers/home_controller.js";
import user from "./user.js";
import project from "./project.js";
import docs from "./docs.js";

export default function (io) {
  const router = express.Router();
  console.log("Router loaded");

  router.get("/", home(io).home);
  router.use("/user", user(io));
  router.use("/project", project(io));
  router.use("/docs", docs(io));
  // for any further routes, access from here
  // router.use('/routerName', require('./route'));
  return router;
}
