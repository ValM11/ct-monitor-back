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
    if (err) throw err;
    var userRole = result[0];
    var userToken = authenticate.generateToken(userRole);
    // console.log({ ...userRole, ...userToken });
    res.json({ ...userRole, ...userToken });
  });
});

module.exports = routerA;
