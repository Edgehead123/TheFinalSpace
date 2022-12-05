const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");

const app = express();
const { Server } = require("socket.io");
const port = 8000;

const { MongoClient, Collection } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// const client = new MongoClient(process.env["MONGO_URL"]) : from guide
//replaced with the const client we used in other projects
const client = new MongoClient(MONGO_URI, options);

const {
  getCharacters,
  getQuotes,
  getCharacter,
  addMessage,
  getMessage,
  leaveRoom,
  handleUser,
  getUserHanlder,
  handleAddFriend,
  handleGetFriends,
  handleChat,
} = require("./handlers");
const { response } = require("express");

app.use(cors());

const server = http.createServer(app);
// const io = require("socket.io")(http);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = ""; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room

io.of("/users").on("connection", (socket) => {
  // console.log("new User");
  socket.emit("welcome", "Hello and welcome to our space");
});

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("disconnect", () => {
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit("chatroom_users", allUsers);
      socket.to(chatRoom).emit("receive_message", {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
  });

  socket.on("leave_room", (data) => {
    const { username, room, __createdtime__ } = data;
    socket.leaveAll(room);
    // const __createdtime__ = Date.now();
    //Remove user fromn memory
    console.log("leave room");
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit("chatroom_users", allUsers);
    socket.to(room).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    });
    console.log(`${username} has left the chat`);
  });

  // Add a user to a room
  socket.on("join_room", (data) => {
    console.log(data);
    const { username, room, userId } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room

    // Get last 100 messages sent in the chat room
    getMessage(room)
      .then((last100Messages) => {
        // console.log('latest messages', last100Messages);
        socket.emit("last_100_messages", last100Messages);
      })
      .catch((err) => console.log(err));

    let __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });
    // Send welcome msg to user that just joined chat only
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });
    // Save the new user to the room
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room, userId });
    console.log(allUsers);
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });
  socket.on("send_message", (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit("receive_message", data); // Send to all users in room, including sender
    addMessage(message, username, room, __createdtime__) // Save message in db
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  });
});

app.use(express.json());
//see Rony's final; proj kickoff to see what these do + google
app.use(helmet());
app.use(morgan("tiny"));

//////// show endpoints
app.get("/character", getCharacters);
app.get(`/characters/:characterId`, getCharacter);
app.get("/quotes", getQuotes);
//////// show endpoints
//adds user
app.post("/user", handleUser);
//gets user based on _id in mongo
app.get("/user/:id", getUserHanlder);
app.post("/user/add-friend/:id", handleAddFriend);
app.get("/user/get-friends/:id", handleGetFriends);
app.post("/user/chat", handleChat);

// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});