const uuid = require("uuid");

const restrictedUrl = ["/studies-codes", "/study-info/:study"];
const restrictedCTMUrl = [
  "/create-study",
  "/update-study/:study",
  "/add-investigator",
];
const restrictedInvUrl = [];
var acceptedToken = [];

function checkUserRole(user, db, functionToCallOnQueryDone) {
  const sentItems = Object.entries(user);
  const userCondition = sentItems
    .map(([key, value]) => key + " = '" + value + "'")
    .join(" and ");
  const userRequest =
    "select user_role from users where " + userCondition + ";";
  db.query(userRequest, functionToCallOnQueryDone);
}

function generateToken(role) {
  if (
    typeof role !== "undefined" &&
    ["CTM", "INV"].includes(Object.values(role)[0])
  ) {
    token = uuid.v1();
    acceptedToken.push(token);
    return { token: token };
  }
}

function firewall(req, res, next) {
  header = req.headers;
  var globalFirewall =
    restrictedUrl.includes(req.url) && acceptedToken.includes(header.token);
  var CTMFirewall =
    restrictedCTMUrl.includes(req.url) &&
    acceptedToken.includes(header.token) &&
    header.user_role === "CTM";
  var InvFirewall =
    restrictedInvUrl.includes(req.url) &&
    acceptedToken.includes(header.token) &&
    header.user_role === "INV";
  var publicUrl = !restrictedUrl
    .concat(restrictedCTMUrl)
    .concat(restrictedInvUrl)
    .includes(req.url);
  if (!(CTMFirewall | InvFirewall | globalFirewall | publicUrl)) {
    res.status(403).send({ message: "Not allowed to use this functionality" });
  } else {
    next();
  }
}

module.exports = {
  checkUserRole,
  generateToken,
  firewall,
};
