const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const port = 8000;

const { getCharacters, getQuotes, getCharacter } = require("./handlers");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  // Add a user to a room
  socket.on("join_room", (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room

    let __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });
     // Send welcome msg to user that just joined chat only
     socket.emit('receive_message', {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });
    // Save the new user to the room
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  });
  
});

app.use(express.json());
//see Rony's final; proj kickoff to see what these do + google
app.use(helmet());
app.use(morgan("tiny"));

//////// show endpoints
app.get("/characters", getCharacters);
app.get(`/characters/:characterId`, getCharacter);
app.get("/quotes", getQuotes);
//////// show endpoints

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

{
  //just comments
  //from Rony from kickoff, delete as final touches
  // .get("/hello", (req, res) => {
  //   res.status(200).json({ status: 200, message: "Hello World!" });
  // })
}

// patch to add friend?
//patch to delete friend?
//add to add user
//delete probably not a requirement for this proj, but delete user
//chat history in session storeage? stretch goal?