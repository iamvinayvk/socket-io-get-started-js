const express = require("express");
const app = express();
const port = 3000;
// socket.io
const { Server } = require("socket.io");

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
