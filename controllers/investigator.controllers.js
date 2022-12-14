function listInvStudies(invEmail, db, functionToCallOnQueryDone) {
  const selectInvStudies =
    "select * from studies where study_id in (select study_id from link_inv_studies where email='" +
    invEmail +
    "') and end_date is null;";
  db.query(selectInvStudies, functionToCallOnQueryDone);
}

function listInvInfos(invEmail, db, functionToCallOnQueryDone) {
  const selectInvInfos =
    "select * from investigators where email='" + invEmail + "';";
  db.query(selectInvInfos, functionToCallOnQueryDone);
}

function listStudyPatients(study, invEmail, db, functionToCallOnQueryDone) {
  const selectPatients =
    "select * from link_patient_study where study_id = '" +
    study +
    "' and site_id in (select site_id from investigators where email='" +
    invEmail +
    "');";
  db.query(selectPatients, functionToCallOnQueryDone);
}

function listInfoPatients(
  table,
  patient,
  visit,
  db,
  functionToCallOnQueryDone
) {
  const selectInfoPatients =
    "select * from " +
    table +
    " where patient_id = " +
    patient +
    " and visit = '" +
    visit +
    "');";
  db.query(selectInfoPatients, functionToCallOnQueryDone);
}

function addInfoPatient(infoToAdd, table, db, functionToCallOnQueryDone) {
  const sentItems = Object.keys(infoToAdd).join(",");
  const itemsValues = Object.values(infoToAdd)
    .map((value) => {
      console.log(typeof value);
      if (typeof value === "string") {
        return '"' + value + '"';
      }
      return value;
    })
    .join(",");
  const addInfoSQL =
    "insert into " + table + "(" + sentItems + ") values(" + itemsValues + ");";
  db.query(addInfoSQL, functionToCallOnQueryDone);
}

function updateInfoPatient(
  patientToUpdate,
  visitToUpdate,
  table,
  itemsToUpdate,
  db,
  functionToCallOnQueryDone
) {
  const itemsInQuery = Object.entries(itemsToUpdate)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return key + " = '" + value + "'";
      }
      return key + " = " + value;
    })
    .join(", ");
  const updateInfoSQL =
    "update " +
    table +
    " set " +
    itemsInQuery +
    " where patient_id = " +
    patientToUpdate +
    " and visit = '" +
    visitToUpdate +
    "';";
  db.query(updateInfoSQL, functionToCallOnQueryDone);
}

module.exports = {
  listInvStudies,
  listInvInfos,
  listStudyPatients,
  listInfoPatients,
  addInfoPatient,
  updateInfoPatient,
};
