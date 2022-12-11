import express from "express";
import home from "../controllers/home_controller.js";
import user from "./user.js";
import project from "./project.js";
import docs from "./docs.js";
import list from "./list.js"
import editor from "./editor.js";
import message from "./message.js"

import { logger2} from '../config/middleware.js'

export default function (io) {
  const router = express.Router();
  console.log("Router loaded");

  router.get("/", logger2 ,home(io).home);
  router.use("/user", user(io));
  router.use("/project", project(io));
  router.use("/docs", docs(io));
  router.use("/list", list(io));
  router.use("/message", message(io));
  router.use("/editor", editor(io));
  // for any further routes, access from here
  // router.use('/routerName', require('./route'));
  return router;
}
