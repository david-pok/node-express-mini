const express = require("express"); //CommonJS
//the same as import express from 'express'; // ES2015 modules

const db = require("./data/db.js");

const server = express();
//this invokes the server and brings it back to us

//configure middleware for the server
server.use(express.json());

//configure routing
//routing is also a form of middleware
//THE HOMIES=REQ,RES
//THE BROS=THEN,CATCH
server.get("/", (req, res) => {
  res.send("Hello FSW12");
});

server.get("/users", (req, res) => {
  db
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
    console.error("error", err);

    res.status(500).json({ message: "Error getting the data" });
  });
});

//start the server
//set a callback function that sends us this consolelog message
server.listen(9000, () => console.log("/n== API on port 9000 ==/n"));
