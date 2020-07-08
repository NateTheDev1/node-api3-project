const express = require("express");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
// app.use(logger);

const userRouter = require("./users/userRouter");
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.json("Hello");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
