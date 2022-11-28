"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
const request = require("request-promise");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const sendResponse = (res, status, data, message = "no message included.") => {
  return res.status(status).json({ status, data, message });
};

//fxn to save chat hist to mongo
const addMessage = async (message, username, room, __createdtime__) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("thefinalspace");
    return await db
      .collection(`${room}`)
      .insertOne({ message, username, room, __createdtime__ });
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
  //console.log("disconnected!");
};

//get chat hist for when first entering a room
const getMessage = async (room) => {
  const client = new MongoClient(MONGO_URI, options);
  try{
await client.connect();
const db = client.db("thefinalspace");
const messages = await db.collection(room).find({room}).toArray();
const messageHist = messages.map(( message ) => {
  return message;
});
return messageHist;
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

//get character
const getCharacters = async (req, res) => {
  try {
    const characters = await request(
      "https://finalspaceapi.com/api/v0/character"
    );
    res.status(200).send(characters);
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

const getQuotes = async (req, res) => {
  try {
    const quotes = await request("https://finalspaceapi.com/api/v0/quote/");
    res.status(200).send(quotes);
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

const getCharacter = async (req, res) => {
  try {
    const { characterId } = req.params;
    //defined line 8 character
    const character = await request(
      `https://finalspaceapi.com/api/v0/character/${characterId}`
      // "https://finalspaceapi.com/api/v0/character/:characterId"
      //  "https://finalspaceapi.com/api/v0/character/5"
    );
    res.status(200).send(character);
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

const leaveRoom = (userID, chatRoomUsers) => {
  return chatRoomUsers.filter((user) => user.id != userID);
}
//get all quotes

//get character quotes

module.exports = {
  getCharacters,
  getCharacter,
  getQuotes,
  addMessage,
  getMessage,
  leaveRoom,
};
