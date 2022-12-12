const express = require("express");
const app = express();
const db = require("../connectDb.js");
const routerC = express.Router();
const studies = require("../controllers/ctm.controllers.js");

app.use(express.json());
app.use(express.text());

// Get all studies codes
routerC.get("/studies-codes", (req, res) => {
  studies.listStudies(db.connectionDb, (err, result) => {
    if (err) {
      res.status(400).send("Error in studies recovery");
    } else res.json(result);
  });
});

// Get information for specific study
routerC.get("/study-info/:study", (req, res) => {
  const selectedStudy = req.params.study;
  console.log(selectedStudy);
  studies.selectStudy(selectedStudy, db.connectionDb, (err, result) => {
    if (err) {
      res.status(400).send({ message: "Error in study recovery" });
    } else res.json(result);
  });
});

// Create new study
routerC.post("/create-study", (req, res) => {
  const studyToAdd = req.body;
  studies.createStudy(studyToAdd, db.connectionDb, (err, result) => {
    if (err) {
      res.status(400).send({
        message: "Error loading study data. Study probably already exists",
      });
    } else res.json(result);
  });
});

// Update study
routerC.post("/update-study/:study", (req, res) => {
  const studyToBeUpdated = req.params.title;
  const itemsToBeUpdated = req.body;
  studies.updateStudy(
    studyToBeUpdated,
    itemsToBeUpdated,
    db.connectionDb,
    (err, result) => {
      if (err) {
        res.status(400).send("Error updating study");
      } else res.json(result);
    }
  );
});

// Add investigator
routerC.post("/add-investigator", (req, res) => {
  const investigatorToAdd = req.body;
  studies.addInvInUsers(investigatorToAdd, db.connectionDb, (err, result) => {
    if (err) {
      res
        .status(400)
        .send(
          "Unable to add investigator in users list. Check if already exists."
        );
    } else res.json(result);
  });
  studies.addInvestigator(investigatorToAdd, db.connectionDb, (err, result) => {
    if (err) {
      res
        .status(400)
        .send(
          "Unable to add investigator for this study. Check if already exists"
        );
    } else res.json(result);
  });
});

module.exports = routerC;
