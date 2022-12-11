import Projects from "../model/Project.js";
import Users from "../model/User.js";
import jwt from "jsonwebtoken";
import Editor from "../model/Editor.js";

export default function (io) {
  const home = async function (req, res) {
    res.send("Editor Router is working");
  };

  const saveEditor = async function (req, res) {
    try {
      await Projects.findByIdAndUpdate(req.body.project_id,
        {
          editor: req.body.contents
        })

      io.sockets.in(req.body.project_id).emit("sync-data",
        { contents: req.body.contents });
      // console.log("reached 2");
      return res.status(201).send({
        success: true,
        message: "Editor contents saved",
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
    }
  };
  return {
    home,
    saveEditor
  };
}
