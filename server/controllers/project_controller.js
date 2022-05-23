import Projects from "../model/Project.js";
import Users from "../model/User.js";
import jwt from "jsonwebtoken";
import Docs from "../model/Docs.js";
import Docsbox from "../model/Docsbox.js";

export default function (io) {
  const home = async function (req, res) {
    res.send("Project Router is working");
  };

  const invite = async function (req, res) {
    try {
      let user = await Users.findOne({
        email: req.body.user_email,
      });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: `no such user`,
        });
      }
      let project = await Projects.findById(req.body.project_id);

      for (let inv of user.invites) {
        if (inv.project_id.toString() === project._id.toString()) {
          return res.status(404).send({
            success: false,
            message: `Terse Jab kehdi bulara, ruka ni jara?`,
          });
        }
      }

      await Users.updateOne(
        {
          _id: user._id,
        },
        {
          $push: {
            invites: {
              project_id: project._id,
              project_name: project.name,
            },
          },
        }
      );

      return res.status(201).send({
        success: true,
        message: "Ruk Bulara abhi",
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
      // res.send("Error", err);
    }
  };

  const getInfo = async function (req, res) {
    try {
      let project = await Projects.findOne({
        _id: req.body.project_id,
      });
      if (!project) {
        return res.status(404).send({
          success: false,
          message: `Bhai error aara : ${err}`,
        });
      }

      let resp = {
        id: project._id,
        name: project.name,
      };
      let users = [];
      // console.log(project);

      for (let uid of project.members) {
        let user = await Users.findById(uid.member);
        // console.log(user);
        users.push({
          user_id: user._id,
          user_name: user.name,
          user_email: user.email,
          user_role: uid.role,
        });
      }
      // console.log("pagal redskull - 1");
      let doc = await Docs.findOne({
        project: project._id,
      });
      // console.log("pagal redskull - 2");

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
      // console.log("pagal redskull - 4");

      return res.status(201).send({
        success: true,
        message: "Le bhay thara Project",
        doc_id: doc._id,
        project: resp,
        members: users,
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

  const createProject = async function (req, res) {
    try {
      let creator = await Users.findOne({ email: req.body.user_email });

      let project = await Projects.create({
        name: req.body.project_name,
        members: [
          {
            member: creator._id,
            role: "admin",
          },
        ],
        admins: [creator._id],
      });

      await Users.updateOne(
        {
          _id: creator._id,
        },
        {
          $push: { projects: project._id },
        }
      );

      let doc = await Docs.create({
        project: project,
        box: [],
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

  const getProject = async function (req, res) {
    try {
      let creator = await Users.findOne({ email: req.body.user_email });
      let projects = [];

      for (let pid of creator.projects) {
        let project = await Projects.findById(pid);
        projects.push({
          project_id: project._id,
          project_name: project.name,
        });
      }

      // add this new server to creator's server list
      return res.status(201).send({
        success: true,
        message: "Le bhay Thare Projects:",
        projects: projects,
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
    }
  };

  const getUsers = async function (req, res) {
    try {
      let project = await Projects.findOne({ _id: req.body.project_id });
      if (!project) {
        return res.status(404).send({
          success: false,
          message: `Bhai error aara : ${err}`,
        });
      }
      let users = [];
      // console.log(project);

      for (let uid of project.members) {
        let user = await Users.findById(uid.member);
        // console.log(user);
        users.push({
          user_id: user._id,
          user_name: user.name,
          user_email: user.email,
          user_role: uid.role,
        });
      }

      // add this new server to creator's server list
      return res.status(201).send({
        success: true,
        message: "Le bhay Thare Members:",
        members: users,
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
    createProject,
    getProject,
    getUsers,
    getInfo,
    invite,
  };
}
