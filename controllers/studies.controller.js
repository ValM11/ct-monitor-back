function createStudy(study, db, functionToCallOnQueryDone) {
  const sentItems = Object.keys(study).join(",");
  const itemsValues = Object.values(study)
    .map((value) => {
      if (typeof value === "string") {
        return '"' + value + '"';
      }
      return value;
    })
    .join(",");
  const insertNewStudy =
    "insert into studies(" + sentItems + ") values(" + itemsValues + ");";
  db.query(insertNewStudy, functionToCallOnQueryDone);
}

function listStudies(db, functionToCallOnQueryDone) {
  const selectAllStudies = "select * from studies;";
  db.query(selectAllStudies, functionToCallOnQueryDone);
}

function selectStudy(selectedItem, db, functionToCallOnQueryDone) {
  const selectStudyRequest =
    "select * from studies where study_id = '" + selectedItem + "';";
  db.query(selectStudyRequest, functionToCallOnQueryDone);
}

function updateStudy(
  studyToUpdate,
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
  const updateStudySQL =
    "update studies set " +
    itemsInQuery +
    " where title = '" +
    studyToUpdate +
    "';";
  db.query(updateStudySQL, functionToCallOnQueryDone);
}

module.exports = { createStudy, listStudies, selectStudy, updateStudy };
