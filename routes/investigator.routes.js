const express = require("express");
const app = express();
const db = require("../connectDb.js");
const routerI = express.Router();
const inv = require("../controllers/investigator.controllers.js");

app.use(express.json());
app.use(express.text());

// Get all studies for invetigator
routerI.get("/studies-inv", (req, res) => {
  const connectedInv = header.inv;
  inv.listInvStudies(connectedInv, db.connectionDb, (err, result) => {
    if (err) {
      res.statusMessage = "Error in studies recovery";
      res.status(400).end();
    } else res.json(result);
  });
});

routerI.get("/inv-info", (req, res) => {
  const connectedInv = header.inv;
  inv.listInvInfos(connectedInv, db.connectionDb, (err, result) => {
    if (err) {
      res.statusMessage = "Error in investigator infos recovery";
      res.status(400).end();
    } else res.json(result);
  });
});

routerI.get("/patients-study/:study/:inv", (req, res) => {
  const selectedStudy = req.params.study;
  const connectedInv = req.params.inv;
  inv.listStudyPatients(
    selectedStudy,
    connectedInv,
    db.connectionDb,
    (err, result) => {
      if (err) {
        res.statusMessage = "Error in study/patient recovery";
        res.status(400).end();
      } else res.json(result);
    }
  );
});

routerI.get("/patients-info/:table/:patient/:visit", (req, res) => {
  const selectedTable = req.params.table;
  const selectedPatient = req.params.patient;
  const selectedVisit = req.params.visit;
  inv.listInfoPatients(
    selectedTable,
    selectedPatient,
    selectedVisit,
    db.connectionDb,
    (err, result) => {
      if (err) {
        res.statusMessage = "Error in study/patient/visit recovery";
        res.status(400).end();
      } else res.json(result);
    }
  );
});

routerI.post("/add-patient-info/:table", (req, res) => {
  const tableToFill = req.params.table;
  const patientToAdd = req.body;
  console.log(tableToFill);
  console.log(patientToAdd);
  // add check to ensure patient could be added ?!
  inv.addInfoPatient(
    patientToAdd,
    tableToFill,
    db.connectionDb,
    (err, result) => {
      if (err) {
        res.statusMessage =
          "Error loading patient data. Patient/visit probably already exists";
        res.status(400).end();
      } else res.json(result);
    }
  );
});

routerI.post("/update-patient-info/:table/:patient/:visit", (req, res) => {
  const tableToUpdate = req.params.table;
  const patientToUpdate = req.params.patient;
  const visitToUpdate = req.params.visit;
  const itemsToUpdate = req.body;
  // add check to ensure patient visit exists ?!
  inv.updateInfoPatient(
    patientToUpdate,
    visitToUpdate,
    tableToUpdate,
    itemsToUpdate,
    db.connectionDb,
    (err, result) => {
      if (err) {
        res.statusMessage = "Error updating table/patient/visit";
        res.status(400).end();
      } else res.json(result);
    }
  );
});

module.exports = routerI;
