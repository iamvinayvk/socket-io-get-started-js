const express = require("express");
const app = express();
const port = 3000;
// socket.io
const { Server } = require("socket.io");
const io = new Server(3001);
io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
