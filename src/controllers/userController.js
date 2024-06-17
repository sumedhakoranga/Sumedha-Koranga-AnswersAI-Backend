const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Question = require("../models/question");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ user });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: "Error creating user", error });
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

exports.getUserQuestions = async (req, res) => {
  const { userId } = req.params;

  try {
    const questions = await Question.findAll({ where: { userId } });

    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving questions", error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};
