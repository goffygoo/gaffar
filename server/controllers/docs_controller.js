import Projects from "../model/Project.js";
import Users from "../model/User.js";
import jwt from "jsonwebtoken";
import Docs from "../model/Docs.js";
import Docsbox from "../model/Docsbox.js";

export default function (io) {
  const home = async function (req, res) {
    res.send("Project Router is working");
  };

  const getDocs = async function (req, res) {
    try {
      let doc = await Docs.findOne({
        project: req.body.project_id,
      });
      if (!doc) {
        return res.status(404).send({
          success: false,
          message: `no such doc`,
        });
      }

      let boxes = [];

      for (let bid of doc.box) {
        let box = await Docsbox.findById(bid);
        // console.log("pagal redskull - 3", box);
        boxes.push({
          box_id: box._id,
          title: box.title,
          url: box.url,
          method: box.method,
          request: box.request,
          response: box.response,
        });
      }

      return res.status(201).send({
        success: true,
        message: "Le bhay thara Docs",
        docs_id: doc._id,
        boxes: boxes,
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
      // res.send("Error", err);
    }
  };

  const saveBox = async function (req, res) {
    try {
      let box = await Docsbox.findById(req.body.box_id);
      // console.log("r-1");

      if (!box) {
        return res.status(404).send({
          success: false,
          message: `invalid save`,
        });
      }
      // console.log("r-2");
      await Docsbox.findByIdAndUpdate(req.body.box_id, {
        title: req.body.title,
        url: req.body.url,
        method: req.body.method,
        response: req.body.response,
        request: req.body.request,
      });
      // console.log("r-3");
      io.sockets.in(req.body.project_id).emit("getDocs" , req.body.project_id);

      return res.status(201).send({
        success: true,
        message: "Changes saved",
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
      // res.send("Error", err);
    }
  };

  const addBox = async function (req, res) {
    try {
      let doc = await Docs.findOne({
        project: req.body.project_id
      });

      if (!doc) {
        return res.status(404).send({
          success: false,
          message: `invalid save`,
        });
      }

      let newbox = await Docsbox.create({
        title: "",
        url: "",
        method: "",
        response: "",
        request: "",
      });

      await Docs.updateOne(
        {
          _id: doc._id,
        },
        {
          $push: { box: newbox._id },
        }
      );
      
      io.sockets.in(req.body.project_id).emit("getDocs" , req.body.project_id);
      // console.log("hello");

      return res.status(201).send({
        success: true,
        message: "Changes saved",
        box: newbox,
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
      // res.send("Error", err);
    }
  };

  const deleteBox = async function (req, res) {
    try {
      let doc = await Docs.findOne({
        project: req.body.project_id
      });
      let tbox = await Docsbox.findById(req.body.box_id);

      if (!doc || !tbox) {
        return res.status(404).send({
          success: false,
          message: `invalid delete`,
        });
      }

      await Docs.updateOne(
        {
          _id: doc._id,
        },
        {
          $pull: { box: tbox._id },
        }
      );
      await Docsbox.findByIdAndDelete(tbox._id);
      io.sockets.in(req.body.project_id).emit("getDocs" , req.body.project_id);

      return res.status(201).send({
        success: true,
        message: "Box deleted",
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
      // res.send("Error", err);
    }
  };

  return {
    home,
    getDocs,
    saveBox,
    deleteBox,
    addBox,
  };
}
