const express = require("express");
const app = express();
const db = require("../connectDb.js");
const router = express.Router();
const studies = require("../controllers/studies.controller.js");

app.use(express.json());
app.use(express.text());

// Get all studies codes
router.get("/studies-codes", (req, res) => {
  studies.listStudies(db.connectionDb, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get information for specific study
router.get("/study-info/:study", (req, res) => {
  const selectedStudy = req.params.study;
  console.log(selectedStudy);
  studies.selectStudy(selectedStudy, db.connectionDb, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Create new study
router.post("/create-study", (req, res) => {
  const studyToAdd = req.body;
  studies.createStudy(studyToAdd, db.connectionDb, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post("/update-study/:study", (req, res) => {
  console.log(req.params);
  const studyToBeUpdated = req.params.title;
  const itemsToBeUpdated = req.body;
  updateStudy(
    studyToBeUpdated,
    itemsToBeUpdated,
    db.connectionDb,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

// Add new site/investigator
// router.post("/add-investigator", studies.addInvestigator);

module.exports = router;
