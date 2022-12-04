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
  try {
    await client.connect();
    const db = client.db("thefinalspace");
    const messages = await db.collection(room).find({ room }).toArray();
    const messageHist = messages.map((message) => {
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
      "https://finalspaceapi.com/api/v0/character/?limit=11"
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
};

//adds users to mongodb
const handleUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("thefinalspace");
    //extract email from body
    const email = req.body.email;
    ///try find that email in mongo
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({
        status: 200,
        message: "user alredy registered",
        user: existingUser,
      });
    } else {
      //insertone user in mongodb
      const newUser = { ...req.body, _id: uuidv4() };
      await db.collection("users").insertOne(newUser);
      return res
        .status(200)
        .json({ status: 200, user: newUser, message: "user registered" });
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
//gets user based on _id
const getUserHanlder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.id;
  try {
    await client.connect();
    const db = client.db("thefinalspace");
    //find the _id that matches UserId
    const user = await db.collection("users").findOne({ _id: userId });
    if (user) {
      return res.status(200).json({ status: 200, data: user });
    } else {
      return res.status(404).json({ status: 404, message: "user not found" });
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
const handleAddFriend = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.id;
  try {
    await client.connect();
    const db = client.db("thefinalspace");
    //find the _id that matches UserId
    const user = await db.collection("users").findOne({ _id: userId });

    if (user.friends) {
      // if you already have an array of friends
      //the friend you are try to add comes from body
      user.friends.push(req.body.friendId);
      await db
        .collection("users")
        .updateOne({ _id: userId }, { $set: { friends: user.friends } });
      return res.status(200).json({ status: 200, message: "friend added" });
    } else {
      // if you dont have an array of friends
      await db
        .collection("users")
        .updateOne({ _id: userId }, { $set: { friends: [req.body.friendId] } });
      return res.status(200).json({ status: 200, message: "friend added" });
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
const handleGetFriends = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.id; // the current user ID the person logged in
  try {
    await client.connect();
    const db = client.db("thefinalspace");

    // find all the users
    const allUsers = await db.collection("users").find().toArray();

    // find the cuurent user
    const user = await db.collection("users").findOne({ _id: userId });

    // filter the users that are friends with the cuurent user
    const friends = allUsers.filter((item) => user.friends.includes(item._id));
    return res.status(200).json({ status: 200, data: friends });
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};
const handleChat = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("thefinalspace");
    const { currentUser, user } = req.body;
    // console.log("req", req.body);

    await db
      .collection("users")
      .updateOne({ _id: currentUser }, { $set: { chat: [user] } });

    await db
      .collection("users")
      .updateOne({ _id: user }, { $set: { chat: [currentUser] } });

    res.status(200).json({ status: 200, message: "users added to chat" });

    // filter the users that are friends with the cuurent user
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

module.exports = {
  getCharacters,
  getCharacter,
  getQuotes,
  addMessage,
  getMessage,
  leaveRoom,
  handleUser,
  getUserHanlder,
  handleAddFriend,
  handleGetFriends,
  handleChat,
};
