import express from "express";
import cors from "cors";
import http, { createServer } from "http";
import { Server } from "socket.io";

var fifi;

export const creator = () => {
  const app = express();
  const server = http.Server(app);
  fifi = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  // console.log(fifi);
  return {
    app,
    server,
  };
};

export const io = { fifi };
