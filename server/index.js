import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index.js";
import http from "http";

// fire up the express app
const app = express();

const PORT = 5000;

const server = http.Server(app);

// connect to database
import db from "./config/mongoose.js";
import passport from "passport";
// console.log(db);

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

// use express router
app.use("/", routes);

server.listen(PORT, function (err) {
  if (err) {
    console.log("oh no no no no no");
    return;
  }
  console.log("hey there i am using project-it on port : ", PORT);
});
