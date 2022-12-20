const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const sockets = new Map();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/edit", (req, res) => {
  res.render("edit");
});

app.get("/:id", (req, res) => {
  res.render("room", { id: req.params.id });
});

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("join", (id, fromWeb) => {
    console.log(id);

    socket.join(id);
    socket.broadcast.to(id).emit("client-connected");

    if (fromWeb) {
      // socket.on("iot-sendData", (data) => {
      //   socket.emit("iot-sendData", data);
      // });
      // console.log("here");
    } else {
      // esp8266 client
      socket.on("sendData", (data) => {
        socket.broadcast.to(id).emit("iot-sendData", data);
      });
    }

    socket.on("disconnect", () => {
      socket.broadcast.to(id).emit("client-disconnected");
    });
  });

  socket.on("error", (err) => {
    console.log(err);
  });
});

server.listen(PORT, () => {
  console.log("listening on *:3000");
});
