const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/:userId", userController.getUserById);
router.get("/:userId/questions", userController.getUserQuestions);
router.get("/", userController.getAllUsers);

module.exports = router;
