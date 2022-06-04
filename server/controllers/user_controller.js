import Users from '../model/User.js'
import Projects from '../model/Project.js'
import PP from '../model/PP.js'
import jwt from 'jsonwebtoken'

export default function (io) {
  const home = async function (req, res) {
    res.send('User Router is working')
  }

  const acceptInvite = async function (req, res) {
    try {
      let user = await Users.findOne({
        email: req.body.user_email,
      })
      if (!user) {
        return res.status(404).send({
          success: false,
          message: `no such user`,
        })
      }
      // console.log(Projects);
      let project = await Projects.findById(req.body.project_id)

      // console.log(user.invites);
      let invites = []
      let co = 0

      for (let inv of user.invites) {
        if (inv.project_id.toString() === project._id.toString()) {
          co++
          await Users.findByIdAndUpdate(user._id, {
            $push: { projects: project._id },
          })
          await Projects.findByIdAndUpdate(project._id, {
            $push: {
              members: {
                member: user._id,
                role: 'fuchha',
              },
            },
          })
        } else {
          invites.push({
            project_id: project._id,
            project_name: project.name,
          })
        }
      }
      if (co === 0) {
        return res.status(404).send({
          success: false,
          message: `bhai pehle aa chuka tu`,
        })
      }
      await Users.findByIdAndUpdate(user._id, {
        invites: invites,
      })

      io.sockets.in(req.body.project_id).emit('getUsers', 'added')

      return res.status(201).send({
        success: true,
        message: 'Aa le chuck mai aa gya',
      })
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      })
      // res.send("Error", err);
    }
  }

  const rejectInvite = async function (req, res) {
    try {
      let user = await Users.findOne({
        email: req.body.user_email,
      })
      if (!user) {
        return res.status(404).send({
          success: false,
          message: `no such user`,
        })
      }
      // console.log(Projects);
      let project = await Projects.findById(req.body.project_id)

      // console.log(user.invites);
      let invites = []
      let co = 0

      for (let inv of user.invites) {
        if (inv.project_id.toString() === project._id.toString()) {
          co++
        } else {
          invites.push({
            project_id: project._id,
            project_name: project.name,
          })
        }
      }
      if (co === 0) {
        return res.status(404).send({
          success: false,
          message: `Gandi Request`,
        })
      }
      await Users.findByIdAndUpdate(user._id, {
        invites: invites,
      })

      return res.status(201).send({
        success: true,
        message: 'Declined Invite',
      })
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      })
      // res.send("Error", err);
    }
  }

  const getInfo = async function (req, res) {
    try {
      let user = await Users.findOne({
        email: req.body.user_email,
      })

      return res.status(201).send({
        success: true,
        message: 'Le bhay thara User',
        user: user,
      })
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      })
      // res.send("Error", err);
    }
  }

  const createUser = async function (req, res) {
    try {
      let user = await Users.create({
        name: req.body.user_name,
        email: req.body.user_email,
        password: req.body.user_password,
      })
      let newimg = await PP.create({
        img:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0zMi40OTk5IDBDMjIuODY0NyAwIDE1IDcuODY0NzIgMTUgMTcuNDk5OUMxNSAyNy4xMzUxIDIyLjg2NDcgMzQuOTk5OSAzMi40OTk5IDM0Ljk5OTlDNDIuMTM1MSAzNC45OTk5IDQ5Ljk5OTkgMjcuMTM1MSA0OS45OTk5IDE3LjQ5OTlDNDkuOTk5OSA3Ljg2NDcyIDQyLjEzNTEgMCAzMi40OTk5IDBaTTMyLjQ5OTkgNC45OTk5OEMzOS40MzMyIDQuOTk5OTggNDQuOTk5OSAxMC41NjY3IDQ0Ljk5OTkgMTcuNDk5OUM0NC45OTk5IDI0LjQzMzIgMzkuNDMzMiAyOS45OTk5IDMyLjQ5OTkgMjkuOTk5OUMyNS41NjY3IDI5Ljk5OTkgMjAgMjQuNDMzMiAyMCAxNy40OTk5QzIwIDEwLjU2NjcgMjUuNTY2NyA0Ljk5OTk4IDMyLjQ5OTkgNC45OTk5OFoiIGZpbGw9IiNFQkVCRUIiLz4NCjxwYXRoIGQ9Ik0zMi40OTkxIDQwLjAwMDJDMTcuMzY3NCA0MC4wMDAyIDkuMjQ4NDggNDEuOTEzNCA0LjYxOTI1IDQ2LjIzMDdDMi4zMDQxOCA0OC4zODk0IDEuMDk0MjYgNTEuMTEyNyAwLjU0MjAxMSA1My44ODY5Qy0wLjAxMDIzNjkgNTYuNjYxMiAxLjMxMzEzZS0wNSA1OS41MzE3IDEuMzEzMTNlLTA1IDYyLjUwMDJDNy45NDIzMmUtMDUgNjMuMTYzMiAwLjI2MzQ5MiA2My43OTkgMC43MzIzMTcgNjQuMjY3OEMxLjIwMTE0IDY0LjczNjcgMS44MzY5OSA2NS4wMDAxIDIuNSA2NS4wMDAySDYyLjQ5OThDNjMuMTYyOCA2NS4wMDAxIDYzLjc5ODYgNjQuNzM2NyA2NC4yNjc1IDY0LjI2NzhDNjQuNzM2MyA2My43OTkgNjQuOTk5NyA2My4xNjMyIDY0Ljk5OTggNjIuNTAwMkM2NC45OTk4IDU5LjYwMzkgNjUuMDA1MyA1Ni43Njg3IDY0LjQ1MjkgNTQuMDA4OUM2My45MDA1IDUxLjI0OTIgNjIuNjk5MyA0OC41MjMgNjAuMzkwNCA0Ni4zNDc3QzU1Ljc3MjQgNDEuOTk3NSA0Ny42Mzk3IDQwIDMyLjUwMDUgNDBMMzIuNDk5MSA0MC4wMDAyWk0zMi40OTkxIDQ1LjAwMDJDNDcuMTY2OCA0NS4wMDAyIDU0LjAzMTggNDcuMjI1MiA1Ni45NjIgNDkuOTg1NUM1OC40MjcyIDUxLjM2NTcgNTkuMTM0OCA1Mi45MTY0IDU5LjU1IDU0Ljk5MDRDNTkuODI3IDU2LjM3MzkgNTkuODA3NyA1OC4yMzQ0IDU5Ljg0NzkgNjAuMDAwMkg1LjE0NTU5QzUuMTg1MTMgNTguMTgyMiA1LjE2ODk3IDU2LjI2NjkgNS40NDgzMiA1NC44NjM0QzUuODYzNjQgNTIuNzc3IDYuNTY3NDYgNTEuMjQ4MiA4LjAyNjMxIDQ5Ljg4OEMxMC45NDQzIDQ3LjE2NzIgMTcuODIzIDQ1LjAwMDIgMzIuNDk5IDQ1LjAwMDJIMzIuNDk5MVoiIGZpbGw9IiNFQkVCRUIiLz4NCjwvc3ZnPg0K',
      })
      await Users.findByIdAndUpdate(user._id, {
        img: newimg._id,
      })
      const payload = {
        user_email: user.email,
        id: user._id,
      }

      const token = jwt.sign(payload, 'Random Alina 2.0', { expiresIn: '1d' })

      return res.status(201).send({
        success: true,
        message: 'Sign up Page Successfully',
        token: 'Bearer ' + token,
        user: user,
      })
    } catch (err) {
      return res.status(404).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      })
      // res.send("Error", err);
    }
  }

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
      let user = await Users.findOne({ email: req.body.user_email })
      // no user found
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Could not find the user',
        })
      }
      // Incorrect Password
      if (req.body.user_password != user.password) {
        return res.status(401).send({
          success: false,
          message: 'Password Invalid',
        })
      }

      const payload = {
        user_email: user.email,
        id: user._id,
      }

      const token = jwt.sign(payload, 'Random Alina 2.0', { expiresIn: '1d' })

      return res.status(201).send({
        success: true,
        message: 'Logged In Successfully',
        token: 'Bearer ' + token,
        user: user,
      })
    } catch (err) {
      return res.status(401).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      })
    }
  }

  const updatePP = async function (req, res) {
    try {
      await PP.findByIdAndUpdate(req.body.img_id, {
        img: req.body.img,
      })

      return res.status(201).send({
        success: true,
        message: 'Profile pic updated',
      })
    } catch (err) {
      return res.status(401).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      })
    }
  }

  const getImg = async function (req, res) {
    try {
      let myimg = await PP.findById(req.query.img_id)

      const imgDataArr = myimg.img.split(',')
      const mime = imgDataArr[0].split(',')[0].match(/:(.*?);/)[1]
      const img = Buffer.from(imgDataArr[1], 'base64')

      res.writeHead(200, {
        'Content-Type': mime,
        'Content-Length': img.length,
      })
      return res.end(img)
    } catch (err) {
      return res.status(401).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      })
    }
  }

  const updatename = async function (req, res) {
    try {
      await Users.findOneAndUpdate(
        {
          email: req.body.user_email,
        },
        {
          name: req.body.name,
        },
      )

      return res.status(201).send({
        success: true,
        message: 'User name updated',
      })
    } catch (err) {
      return res.status(401).send({
        success: false,
        message: `Bhai error aara : ${err}`,
      })
    }
  }
  return {
    home,
    createUser,
    login,
    updatePP,
    updatename,
    getInfo,
    acceptInvite,
    rejectInvite,
    getImg,
  }
}
