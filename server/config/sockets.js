const iofunc = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("join", (data) => {
      // console.log("entered channel", data.channel_id);
      socket.join(data);
      console.log(`User Entered following project : ${data}`);
    });

    socket.on("joined-editor", (data) => {
      io.sockets
        .in(data)
        .fetchSockets()
        .then((connectedSockets) => {
          // console.log(connectedSockets.length);
          if (connectedSockets.length !== 1) {
            io.to(connectedSockets[0].id).emit("requestingData", data);
          }
        })
        .catch((err) => {
          console.log(err)
        });
    });

    socket.on("current-editor-contents", (data) => {
      // console.log("hi from current-editor-contents", data.contents)
      // console.log("entered channel", data.channel_id);
      socket.broadcast.to(data.project_id).emit("sync-data", {
        contents: data.contents
      });
    });

    socket.on("send-changes", (data) => {
      // console.log("hi")
      // console.log("entered channel", data.channel_id);
      socket.broadcast.to(data.project_id).emit("receive-changes", {
        delta: data.delta,
        id: data.id,
        contents: data.contents
      });
    });

    // disconnect
    socket.on("disconnecting", () => {
      console.log(`User disconnected : ${socket.id}`);
    });
  });
};
export default iofunc;