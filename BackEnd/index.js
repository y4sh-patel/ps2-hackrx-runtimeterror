"use strict";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config.js";
import db from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(config.port, () => {
  console.log(`App is listening to ${config.port}`);
});
