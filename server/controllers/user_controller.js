import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const home = function (req, res) {
  res.send("User Controller is Working");
};
// working
export const createUser = async function (req, res) {
  try {
    let user = await User.create({
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

export const login = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.user_email });
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
