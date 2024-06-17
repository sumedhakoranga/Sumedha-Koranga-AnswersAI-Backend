const request = require("supertest");
const app = require("../app");
const sequelize = require("../src/config/database");

describe("API Endpoints", () => {
  let token;
  let userId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const userResponse = await request(app)
      .post("/api/users")
      .send({ email: "test@example.com", password: "password" });

    userId = userResponse.body.user.id;

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should get user by id", async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", "test@example.com");
  });

  it("should create a question", async () => {
    const res = await request(app)
      .post("/api/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "What is Node.js?",
        answer:
          "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("question");
    expect(res.body.question).toHaveProperty("content", "What is Node.js?");
  });
});
