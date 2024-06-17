const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, questionController.createQuestion);
router.get("/:questionId", authMiddleware, questionController.getQuestionById);

module.exports = router;
