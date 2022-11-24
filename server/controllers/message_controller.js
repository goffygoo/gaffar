import Projects from "../model/Project.js";
import Users from "../model/User.js";
import jwt from "jsonwebtoken";
import Messages from "../model/Message.js"

export default function (io) {
  const home = async function (req, res) {
    res.send("Message Router is working");
  };
  const createMessage = async function (req, res) {
    try {
      let message = await Messages.create({
        sender: req.body.user_id,
        text: req.body.msg_data,
        project: req.body.project_id,
        image: req.body.img
      });
      console.log(req.body);

      let msg = {
        sender: req.body.name,
        sender_id: message.sender,
        message_id: message._id,
        text: message.text,
        time_stamp: message.createdAt,
        img: req.body.img
      }
      
      io.sockets.in(req.body.project_id).emit("new_message_created" , msg);
      // console.log("reached 2");
      return res.status(201).send({
        success: true,
        message: "Message successfully created",
        message: msg,
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
    }
  };
  const deleteMessage = async function (req,res) {
    try {
      // console.log(msg);
      let message = await Messages.findById(req.body.message_id);
      // let channel = await Channels.findById(message.channel);
      if (!message) return "";
      await Messages.findByIdAndDelete(req.body.message_id);
      io.sockets.in(req.body.project_id).emit("message_deleted" , req.body.message_id);

      // console.log(retVal);
      return res.status(201).send({
        success: true,
        message: "Message successfully deleted",
      });
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      });
    }
  };

  const fetchAllMess = async function (req, res) {
    try {
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
          img: req.body.img
        });
      }
      return res.status(201).send({
        success: true,
        message: `Le bhai tere saare messages`,
        messages: allmess,
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
    createMessage,
    fetchAllMess,
    deleteMessage
  };
}
