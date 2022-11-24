import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index.js";
import { Server } from "socket.io";
import http from "http";
import iofunc from "./config/sockets.js"

// fire up the express app
const app = express();

const PORT = 5000;

const server = http.Server(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
iofunc(io);

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

// use express router
app.use("/", routes(io));

server.listen(process.env.PORT || PORT, function (err) {
  if (err) {
    console.log("oh no no no no no");
    return;
  }
  console.log("hey there i am using project-y on port : ", PORT);
});
