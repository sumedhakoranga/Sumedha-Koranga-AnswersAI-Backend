const Question = require("../models/question");
const { getAnswer } = require("../services/openaiService");

exports.createQuestion = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    console.log("Content received:", content);
    console.log("User ID:", userId);

    const aiResponse = await getAnswer(content);

    console.log("AI Response:", aiResponse);

    const question = await Question.create({
      content,
      userId,
      answer: aiResponse,
    });

    res.status(201).json({ question });
  } catch (error) {
    console.error("Error creating question:", error);

    if (error.message && error.message.includes("quota")) {
      res.status(429).json({
        message:
          "Quota exceeded. Please check your OpenAI plan and billing details.",
      });
    } else {
      res
        .status(500)
        .json({
          message: "Error creating question",
          error: error.message || error,
        });
    }
  }
};

exports.getQuestionById = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findByPk(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ question });
  } catch (error) {
    console.error("Error fetching question:", error);
    res
      .status(500)
      .json({
        message: "Error fetching question",
        error: error.message || error,
      });
  }
};
