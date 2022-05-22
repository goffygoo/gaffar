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
        let box = await Projects.findById(bid);
        boxes.push(box);
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

      if (!box) {
        return res.status(404).send({
          success: false,
          message: `invalid save`,
        });
      }
      await Docsbox.findByIdAndUpdate(req.body.box_id, {
        title: req.body.title,
        url: req.body.url,
        method: req.body.method,
        response: req.body.response,
        request: req.body.request,
      });

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
      let doc = await Docs.findById(req.body.docs_id);

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

  return {
    home,
    getDocs,
    saveBox,
    addBox,
  };
}
