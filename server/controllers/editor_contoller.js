import Projects from "../model/Project.js";
import Users from "../model/User.js";
import jwt from "jsonwebtoken";
import Editor from "../model/Editor.js";

export default function (io) {
  const home = async function (req, res) {
    res.send("Editor Router is working");
  };
  return {
    home,
  };
}
