import Projects from "../model/Project.js";
import Users from "../model/User.js";
import jwt from "jsonwebtoken";
import Docs from "../model/Docs.js";
import Docsbox from "../model/Docsbox.js";
import Lists from "../model/List.js";
import Messages from "../model/Message.js"

export default function (io) {
  const home = async function (req, res) {
    res.send("Project Router is working");
  };

  const invite = async function (req, res) {
    try {
      let user = await Users.findOne({
        email: req.body.new_user_email,
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
    // console.log("logged 1");
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
      let am_i_admin = false;
      // console.log(project);

      for (let uid of project.members) {
        let user = await Users.findById(uid.member);
        if (user.email === req.body.user_email) {
          // console.log("hola");
          am_i_admin = uid.admin;
        }
        // console.log(user);
        users.push({
          user_id: user._id,
          user_name: user.name,
          user_email: user.email,
          user_photu: user.img,
          user_role: uid.role,
          is_admin: uid.admin,
        });
      }
      // console.log(am_i_admin);
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
      let tasks = [];
      let list = await Lists.findOne({
        project: project._id,
      });
      let lb = list.listboards;
      if (!lb) {
        lb = {
          list: {},
          board: {},
        };
      } else {
        for (let board in list.listboards.board) {
          let col = list.listboards.board[board];
          // console.log(board);
          for (let column in col.columns) {
            // console.log(column);
            let tc = col.columns[column];
            for (let task in tc.items) {
              let tt = tc.items[task];
              for (let mems of tt.membersAdded) {
                // console.log(mems);
                if (mems.user_email === req.body.user_email) {
                  tt["checked"] = column === "Done";
                  tasks.push(tt);
                }
              }
            }
          }
        }
      }
      // messages collection : 
      let allMessages = await Messages.find({ project: req.body.project_id });
      let allmess = [];
      for (let message of allMessages) {
        let sender = await Users.findById(message.sender);
        allmess.push({
          sender: sender.name,
          sender_id: message.sender,
          message_id: message._id,
          text: message.text,
          time_stamp: message.createdAt,
          img: message.image
        });
      }

      return res.status(201).send({
        success: true,
        message: "Le bhay thara Project",
        doc_id: doc._id,
        project: resp,
        members: users,
        boxes: boxes,
        list: lb,
        tasks: tasks,
        is_admin: am_i_admin,
        gitLink: project.gitLink,
        discLink: project.discLink,
        resources: project.resources,
        notes: project.notes,
        messages: allmess,
        editorContents: project.editor
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
            admin: true,
          },
        ],
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

      let list = await Lists.create({
        project: project,
        listboards: {
          list: {},
          board: {},
        },
      });

      // await Docs.findByIdAndUpdate(doc._id, {
      //   project: project._id,
      // });
      await Projects.findByIdAndUpdate(project._id, {
        doc: doc._id,
        list: list._id,
      });

      let resp = {
        project_id: project._id,
        project_name: project.name,
        doc_id: doc._id,
        list_id: list._id,
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
          user_photu: user.img,
          user_role: uid.role,
          is_admin: uid.admin,
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

  const makeAdmin = async function (req, res) {
    try {
      let project = await Projects.findOne({ _id: req.body.project_id });
      if (!project) {
        return res.status(404).send({
          success: false,
          message: `No such project found`,
        });
      }
      let users = [];
      // console.log(project);

      for (let uid of project.members) {
        if (uid.member.toString() === req.body.user_id.toString()) {
          uid.admin = true;
          // console.log("hello");
        }
        // console.log(user);
        users.push(uid);
      }
      await Projects.findOneAndUpdate(
        { _id: req.body.project_id },
        {
          members: users,
        }
      );

      io.sockets.in(req.body.project_id).emit("getUsers", "hehe");

      // add this new server to creator's server list
      return res.status(201).send({
        success: true,
        message: "Admin banaya aapne",
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
    }
  };

  const changeRole = async function (req, res) {
    try {
      let project = await Projects.findOne({ _id: req.body.project_id });
      if (!project) {
        return res.status(404).send({
          success: false,
          message: `No such project found`,
        });
      }
      let users = [];
      // console.log(project);

      for (let uid of project.members) {
        if (uid.member.toString() === req.body.user_id.toString()) {
          uid.role = req.body.new_role;
          // console.log("hello");
        }
        // console.log(user);
        users.push(uid);
      }
      await Projects.findOneAndUpdate(
        { _id: req.body.project_id },
        {
          // papa ka phone aa rkha
          // axios bann rakha
          members: users,
        }
      );

      io.sockets.in(req.body.project_id).emit("getUsers", "changed");

      // add this new server to creator's server list
      return res.status(201).send({
        success: true,
        message: "Role Changed",
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
    }
  };

  const saveExtras = async function (req, res) {
    try {
      let project = await Projects.findOne({ _id: req.body.project_id });
      if (!project) {
        return res.status(404).send({
          success: false,
          message: `No such project found`,
        });
      }
      await Projects.findOneAndUpdate(
        { _id: project._id },
        {
          gitLink: req.body.gitLink,
          discLink: req.body.discLink,
          resources: req.body.resources,
          notes: req.body.notes,
        }
      );
      console.log("extras changing");
      io.sockets.in(req.body.project_id).emit("getExtras", {
        gitLink: req.body.gitLink,
        discLink: req.body.discLink,
        resources: req.body.resources,
        notes: req.body.notes,
      });

      return res.status(201).send({
        success: true,
        message: "Extras Changed",
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
    makeAdmin,
    changeRole,
    saveExtras,
  };
}
