const express = require("express");
const app = express();
const db = require("../connectDb.js");
const routerS = express.Router();
const studies = require("../controllers/studies.controller.js");

app.use(express.json());
app.use(express.text());

// Get all studies codes
routerS.get("/studies-codes", (req, res) => {
  studies.listStudies(db.connectionDb, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get information for specific study
routerS.get("/study-info/:study", (req, res) => {
  const selectedStudy = req.params.study;
  console.log(selectedStudy);
  studies.selectStudy(selectedStudy, db.connectionDb, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Create new study
routerS.post("/create-study", (req, res) => {
  const studyToAdd = req.body;
  studies.createStudy(studyToAdd, db.connectionDb, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Update study
routerS.post("/update-study/:study", (req, res) => {
  const studyToBeUpdated = req.params.title;
  const itemsToBeUpdated = req.body;
  studies.updateStudy(
    studyToBeUpdated,
    itemsToBeUpdated,
    db.connectionDb,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

// Add investigator
routerS.post("/add-investigator", (req, res) => {
  const investigatorToAdd = req.body;
  studies.addInvestigator(investigatorToAdd, db.connectionDb, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Add new site/investigator
// router.post("/add-investigator", studies.addInvestigator);

module.exports = routerS;
