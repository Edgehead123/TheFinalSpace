const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const app = express();
const {Server} = require('socket.io');
const port = 8000;

const { getCharacters, getQuotes, getCharacter } = require("./handlers");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
})

app.use(express.json());
  //see Rony's final; proj kickoff to see what these do + google
  app.use(helmet());
  app.use(morgan("tiny"));

//////// show endpoints
app.get("/characters", getCharacters);
app.get(`/characters/:characterId`, getCharacter);
app.get("/quotes", getQuotes)
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

  {//just comments
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
