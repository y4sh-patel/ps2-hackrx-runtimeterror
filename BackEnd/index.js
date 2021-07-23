"use strict";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config.js";
import db from "./db.js";
import Message from "./Models/message.js";
import Channel from "./Models/channel.js";

const app = express();
app.use(express.json());
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/addchannel", (req, res) => {
  var name = req.body;
  // var channel = new Channel({
  //   channelName: name,
  // });
  console.log(name);
  res.json("Reached Successfully");
  // channel.save((err, newChannel) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).json(err.message);
  //   } else {
  //     console.log(newChannel);
  //     res.status(200).send(newChannel);
  //   }
  // });
});

app.get("/getchannel", (req, res) => {
  var channel = new Channel();

  channel.find(
    {},
    { channelName: 1, _id: 1, messages: 0 },
    (err, channelNames) => {
      if (err) {
        console.log(err);
        res.status(400).json(err.message);
      } else {
        console.log(newChannel);
        res.status(200).send(channelNames);
      }
    }
  );
});

app.get("/getChannelDetails", (req, res) => {
  var id = req.body.id;
  channel.find({ _id: id }, (err, foundChannels) => {
    if (err) {
      console.log(err);
      res.status(400).json(err.message);
    } else {
      console.log(newChannel);
      res.status(200).send(foundChannels);
    }
  });
});

app.get("/addMessage", (req, res) => {
  var message = req.body.message;
  var channelId = req.body.channel_id;
  var userId = req.body.user_id;
  var keywords = ["xyz", "abc"];

  var message = new Message({
    message: message,
    keywords: keywords,
    user: userId,
  });

  var channel = new Channel();

  channel.update(
    { _id: channelId },
    { $push: { messages: message } },
    (err, done) => {
      if (err) {
        console.log(err);
        res.status(400).json(err.message);
      } else {
        console.log(newChannel);
        res.send("successfully saved message");
      }
    }
  );
});

// app.get("/temp", (req, res) => {
//   const tempMessage = {
//     message: "Hello Buddy",
//     keywords: "Buddy",
//     user: "Parva",
//   };
//   const message = new Message(tempMessage);
//   message.save((err, newMessage) => {
//     if (err) {
//       console.log(err);
//       res.status(400).json(err.message);
//     } else {
//       console.log(newMessage);
//       res.status(200).send(newMessage);
//     }
//   });
// });

app.get("/addchannel", (req, res) => {
  const tempMessage1 = {
    message: "Hello Parva Buddy",
    keywords: "Buddy",
    user: "Parva",
  };
  const message = new Message(tempMessage1);
  const tempChannel = {
    channelName: "Hackrx2.0",
    messages: [message],
  };
  const channel = new Channel(tempChannel);
  channel.save((err, newChannel) => {
    if (err) {
      console.log(err);
      res.status(400).json(err.message);
    } else {
      console.log(newChannel);
      res.status(200).send(newChannel);
    }
  });
});

app.listen(config.port, () => {
  console.log(`App is listening to ${config.port}`);
});
