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

function addInvestigator(invToAdd, db, functionToCallOnQueryDone) {
  const sentItems = Object.keys(invToAdd).join(",");
  const itemsValues = Object.values(invToAdd)
    .map((value) => {
      console.log(typeof value);
      if (typeof value === "string") {
        return '"' + value + '"';
      }
      return value;
    })
    .join(",");
  const addInvestigatorSQL =
    "insert into investigators(" + sentItems + ") values(" + itemsValues + ");";
  db.query(addInvestigatorSQL, functionToCallOnQueryDone);
}

function checkUser(user, db, functionToCallOnQueryDone) {
  const sentItems = Object.keys(user);
  const itemsValues = Object.values(user);
  const userRequest =
    "select user_role from users where " +
    sentItems +
    "= '" +
    itemsValues +
    "';";
  db.query(userRequest, functionToCallOnQueryDone);
}

module.exports = {
  createStudy,
  listStudies,
  selectStudy,
  updateStudy,
  addInvestigator,
  checkUser,
};
