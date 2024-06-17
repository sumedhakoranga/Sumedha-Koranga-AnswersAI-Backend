const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./src/config/database");
const userRoutes = require("./src/routes/users");
const questionRoutes = require("./src/routes/questions");
const authRoutes = require("./src/routes/auth");
const User = require("./src/models/user");
const Question = require("./src/models/question");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the AnswerAI Backend Service");
});

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  sequelize
    .sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
}

module.exports = app;
