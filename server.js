const path = require("path");
const http = require("http");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const AuthRouter = require("./modules/auth/auth.route");
const RequestRouter = require("./modules/request/request.route");
const RoomRouter = require("./modules/room/room.route");
const ChangeProfileRouter = require("./modules/changeProfile/changeProfile.route");

// Connect MongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, createIndexs: true },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connected");
  }
);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", '*');
//     next();
// });

const prefix = "api";

// Config router
app.use(`/${prefix}/auth`, AuthRouter);
app.use(`/${prefix}/req`, RequestRouter);
app.use(`/${prefix}/room`, RoomRouter);
app.use(`/${prefix}/user`, ChangeProfileRouter);

const botName = "ChatCord Bot";

//Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    console.log(user.room);
    console.log("joinRoom");
    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    socket.broadcast.to(user.room).emit("join");

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    // io.to(user.room).emit("roomUsers", {
    //   users: getRoomUsers(user.room),
    // });
  });

  // Listen for chat message
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    console.log(user);
    console.log("chatMessage");
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Run when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    console.log("disconnect");

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
    }

    // Send users and room info
    // io.to(user.room).emit("roomUsers", {
    //   users: getRoomUsers(user.room),
    // });
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
