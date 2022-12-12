const express = require("express");
const app = express();
const db = require("../connectDb.js");
const routerA = express.Router();
const authenticate = require("../controllers/authenticate.controller.js");

app.use(express.json());
app.use(express.text());

routerA.post("/check-user-role", (req, res) => {
  const userToCheck = req.body;
  authenticate.checkUserRole(userToCheck, db.connectionDb, (err, result) => {
    var userRole = result[0];
    if (userRole === undefined) {
      res.statusMessage = "Wrong Login and/or password. Try again...";
      res.status(403).end();
    } else {
      var userToken = authenticate.generateToken(userRole);
      res.json({ ...userRole, ...userToken });
    }
  });
});

module.exports = routerA;
