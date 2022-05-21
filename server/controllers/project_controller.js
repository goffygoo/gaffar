import Projects from "../model/Project.js";
import Users from "../model/User.js";
import jwt from "jsonwebtoken";
import Docs from "../model/Docs.js";

export const home = function (req, res) {
  res.send("Project Controller is Working");
};

export const createProject = async function (req, res) {
  try {
    let creator = await Users.findOne({ email: req.body.user_email });

    let project = await Projects.create({
      name: req.body.project_name,
      members: [creator._id],
      admins: [creator._id],
    });

    let doc = await Docs.create({
      project: project,
    });

    await Docs.findByIdAndUpdate(doc._id, {
      project: project._id,
    });
    await Projects.findByIdAndUpdate(project._id, {
      doc: doc._id,
    });

    let resp = {
      project_id: project._id,
      project_name: project.name,
      doc_id: doc._id,
    };
    // add this new server to creator's server list
    return res.status(201).send({
      success: true,
      message: "Project successfully created",
      resp: resp,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: `Bhai error aara : ${err}`,
    });
  }
};
