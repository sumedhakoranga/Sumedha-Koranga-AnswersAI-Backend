const sequelize = require("../src/config/database");
const User = require("../src/models/user");
const Question = require("../src/models/question");
const bcrypt = require("bcryptjs");

describe("Database Interactions", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create and retrieve a user", async () => {
    const user = await User.create({
      email: "test@example.com",
      password: "password",
    });

    const retrievedUser = await User.findByPk(user.id);
    expect(retrievedUser).toBeTruthy();
    expect(retrievedUser.email).toBe("test@example.com");

    const passwordMatch = await bcrypt.compare(
      "password",
      retrievedUser.password
    );
    expect(passwordMatch).toBe(true);
  });

  it("should create and retrieve a question", async () => {
    const user = await User.create({
      email: "test@example.com",
      password: "password",
    });

    const question = await Question.create({
      content: "What is Node.js?",
      answer:
        "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      userId: user.id,
    });

    const retrievedQuestion = await Question.findByPk(question.id);
    expect(retrievedQuestion).toBeTruthy();
    expect(retrievedQuestion.content).toBe("What is Node.js?");
    expect(retrievedQuestion.answer).toBe(
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
    );
  });
});
