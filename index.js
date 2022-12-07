const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const router = require("./routes/studies.routes.js");

app.use(cors());
app.use(express.json());
app.use(express.text());

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
