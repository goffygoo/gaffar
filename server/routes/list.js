import express from "express";
import passport from "passport";
import "../config/passport.js";
import home from "../controllers/list_controller.js";
import {adminAccess} from '../config/middleware.js'

export default function (io) {
    const router = express.Router();
    console.log("List Router loaded");

    router.get("/", home(io).home);
    router.post('/getList', home(io).getList);
    router.post('/saveList',adminAccess, home(io).saveList);

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
