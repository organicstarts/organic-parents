const request = require("supertest");
const app = require("../app");
const Thread = require("../models/thread");
const {
  userOneId,
  userOne,
  threadOneId,
  userTwoId,
  userTwo,
  replyOne,
  postTwo,
  postThree,
  setupDatabase
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create thread for user", async () => {
  const response = await request(app)
    .post("/thread")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      subject: "New Thread",
      content: "From my test"
    })
    .expect(201);
  const thread = await Thread.findById(response.body._id);
  expect(thread).not.toBeNull();
});


test('Should fetch all threads', async () => {
    const response = await request(app)
        .get('/threads')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(1)
})
