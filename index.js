const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const authenticate = require("./controllers/authenticate.controller.js");
const routerC = require("./routes/ctm.routes.js");
const routerI = require("./routes/investigator.routes.js");
const routerA = require("./routes/authenticate.routes.js");

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(authenticate.firewall);

app.use("/", routerC);
app.use("/", routerI);
app.use("/", routerA);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
