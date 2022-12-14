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
      res.statusMessage = "Error in studies recovery";
      res.status(400).end();
    } else res.json(result);
  });
});

// Get information for specific study
routerC.get("/study-info/:study", (req, res) => {
  const selectedStudy = req.params.study;
  console.log(selectedStudy);
  studies.selectStudy(selectedStudy, db.connectionDb, (err, result) => {
    if (err) {
      res.statusMessage = "Error in study recovery";
      res.status(400).end();
    } else res.json(result);
  });
});

// Create new study
routerC.post("/create-study", (req, res) => {
  const studyToAdd = req.body;
  studies.createStudy(studyToAdd, db.connectionDb, (err, result) => {
    if (err) {
      res.statusMessage =
        "Error loading study data. Study probably already exists";
      res.status(400).end();
    } else res.json(result);
  });
});

// Update study
routerC.post("/update-study/:study", (req, res) => {
  const studyToBeUpdated = req.params.study;
  const itemsToBeUpdated = req.body;
  console.log(studyToBeUpdated);
  console.log(itemsToBeUpdated);
  studies.updateStudy(
    studyToBeUpdated,
    itemsToBeUpdated,
    db.connectionDb,
    (err, result) => {
      if (err) {
        res.statusMessage = "Error updating study";
        res.status(400).end();
      } else res.json(result);
    }
  );
});

// Add investigator
routerC.post("/add-investigator", (req, res) => {
  const investigatorToAdd = req.body;
  studies.addInvInUsers(investigatorToAdd, db.connectionDb, (err, result) => {
    if (err) {
      res.statusMessage =
        "Unable to add investigator in users list. Check if already exists.";
      res.status(400).end();
    } else {
      studies.addInvestigator(
        investigatorToAdd,
        db.connectionDb,
        (err, result) => {
          if (err) {
            res.statusMessage =
              "Unable to add investigator in the list. Check if already exists";
            res.status(400).end();
          } else res.json(result);
        }
      );
    }
  });
});

routerC.post("/link-investigator-study", (req, res) => {
  const investigatorToAdd = req.body;
  studies.addInvStudyLink(investigatorToAdd, db.connectionDb, (err, result) => {
    if (err) {
      res.statusMessage =
        "Unable to add investigator for this study. Check if already exists";
      res.status(400).end();
    } else res.json(result);
  });
});

module.exports = routerC;
