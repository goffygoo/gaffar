import Users from "../model/User.js";
import Projects from "../model/Project.js";
import jwt from "jsonwebtoken";

export default function (io) {
  const home = async function (req, res) {
    res.send("User Router is working");
  };

  const acceptInvite = async function (req, res) {
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
      // console.log(Projects);
      let project = await Projects.findById(req.body.project_id);

      // console.log(user.invites);
      let invites = [];
      let co = 0;

      for (let inv of user.invites) {
        if (inv.project_id.toString() === project._id.toString()) {
          co++;
          await Users.findByIdAndUpdate(user._id , 
            {
              $push: { projects: project._id },
            })
          await Projects.findByIdAndUpdate(project._id , {
            $push: { members: {
              member: user._id,
              role: "fuchha"
            }  },
          })
        } else{
          invites.push({
            project_id: project._id,
            project_name: project.name
          })
        }
      }
      if(co === 0){
          return res.status(404).send({
            success: false,
            message: `bhai pehle aa chuka tu`,
          });
      }
      await Users.findByIdAndUpdate(user._id,{
        invites: invites
      })

      return res.status(201).send({
        success: true,
        message: "Aa le chuck mai aa gya",
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
      let user = await Users.findOne({
        email: req.body.user_email,
      });

      return res.status(201).send({
        success: true,
        message: "Le bhay thara User",
        user: user,
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
      // res.send("Error", err);
    }
  };

  const createUser = async function (req, res) {
    try {
      let user = await Users.create({
        name: req.body.user_name,
        email: req.body.user_email,
        password: req.body.user_password,
      });
      const payload = {
        user_email: user.email,
        id: user._id,
      };

      const token = jwt.sign(payload, "Random Alina 2.0", { expiresIn: "1d" });

      return res.status(201).send({
        success: true,
        message: "Sign up Page Successfully",
        token: "Bearer " + token,
        user: user,
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
      // res.send("Error", err);
    }
  };

  /*
  // working
  export const userInfo = async function (req, res) {
    try {
      let user = await User.findById(req.body.user_id);
      if (!user) {
        return res.status(401).send({
          success: false,
          message: "Could not find the user",
        });
      }
      var servers = [];
      for (let sid of user.servers) {
        let server = await Server.findById(sid);
        servers.push({
          server_id: server._id,
          server_name: server.name,
        });
      }
      res.status(200).send({
        success: true,
        message: "Le bhai apna user",
        user_name: user.name,
        servers: servers,
      });
      // console.log(user);
      // res.send(user);
    } catch (err) {
      res.status(404);
      // console.log(err);
      res.send(`Bhai error aara : ${err}`);
    }
  }; */

  const login = async function (req, res) {
    try {
      let user = await Users.findOne({ email: req.body.user_email });
      // no user found
      if (!user) {
        return res.status(401).send({
          success: false,
          message: "Could not find the user",
        });
      }
      // Incorrect Password
      if (req.body.user_password != user.password) {
        return res.status(401).send({
          success: false,
          message: "Password Invalid",
        });
      }

      const payload = {
        user_email: user.email,
        id: user._id,
      };

      const token = jwt.sign(payload, "Random Alina 2.0", { expiresIn: "1d" });

      return res.status(201).send({
        success: true,
        message: "Logged In Successfully",
        token: "Bearer " + token,
        user: user,
      });
    } catch (err) {
      return res.status(401).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
    }
  };

  const updatePP = async function (req, res) {
    try {
      await Users.findOneAndUpdate(
        {
          email: req.body.user_email,
        },
        {
          img: req.body.img,
        }
      );

      return res.status(201).send({
        success: true,
        message: "Profile pic updated",
      });
    } catch (err) {
      return res.status(401).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
    }
  };

  const updatename = async function (req, res) {
    try {
      await Users.findOneAndUpdate(
        {
          email: req.body.user_email,
        },
        {
          name: req.body.name,
        }
      );

      return res.status(201).send({
        success: true,
        message: "User name updated",
      });
    } catch (err) {
      return res.status(401).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
    }
  };
  return {
    home,
    createUser,
    login,
    updatePP,
    updatename,
    getInfo,
    acceptInvite,
  };
}
