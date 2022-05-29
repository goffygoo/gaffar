const iofunc = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`);

    socket.on("join", (data) => {
      // console.log("entered channel", data.channel_id);
      console.log(`User Entered following project : ${data}`);
      socket.join(data);
    });

    // disconnect
    socket.on("disconnecting", () => {
      console.log(`User disconnected : ${socket.id}`);
    });
  });
};
export default iofunc;