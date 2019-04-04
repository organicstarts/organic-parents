const request = require("supertest");
const app = require("../server");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      firstName: "Yvan",
      lastName: "Pangilinan",
      email: "yvan@organicstart.com",
      password: "boxing123"
    })
    .expect(201);
});
