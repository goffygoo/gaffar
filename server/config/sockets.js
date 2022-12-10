const iofunc = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("join", (data) => {
      // console.log("entered channel", data.channel_id);
      console.log(`User Entered following project : ${data}`);
      socket.join(data);
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