const express = require("express");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json("Hello");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
