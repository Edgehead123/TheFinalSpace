const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const {Server} = require('socket.io');
const port = 8000;

const { getCharacters, getQuotes, getCharacter } = require("./handlers");

express()
// .use(cors())

  .use(express.json())
  //see Rony's final; proj kickoff to see what these do + google
  .use(helmet())
  .use(morgan("tiny"))

//////// show endpoints
  .get("/characters", getCharacters)
  .get(`/characters/:characterId`, getCharacter)
  .get("/quotes", getQuotes)
  //////// show endpoints

  // patch to add friend?
  //patch to delete friend?
  //add to add user
  //delete probably not a requirement for this proj, but delete user
  //chat history in session storeage? stretch goal?


  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  {//just comments
  //from Rony from kickoff, delete as final touches
  // .get("/hello", (req, res) => {
  //   res.status(200).json({ status: 200, message: "Hello World!" });
  // })
}
