const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Reply = require("../../models/reply");
const Thread = require("../../models/thread");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
  password: "johndoe123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  firstName: "Jess",
  lastName: "Doe",
  email: "jess@example.com",
  password: "myhouse099@@",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }
  ]
};

const threadOneId = new mongoose.Types.ObjectId();
const threadOne = {
  _id: threadOneId,
  subject: "Hello World",
  content: "yuppie",
  owner: userOne._id
};

const replyOne = {
  _id: new mongoose.Types.ObjectId(),
  content: "First Reply",
  completed: false,
  owner: userOne._id,
  thread: threadOne._id
};

const replyTwo = {
  _id: new mongoose.Types.ObjectId(),
  content: "Second Reply",
  completed: true,
  owner: userOne._id,
  thread: threadOne._id
};

const replyThree = {
  _id: new mongoose.Types.ObjectId(),
  content: "Third Reply",
  completed: true,
  owner: userTwo._id,
  thread: threadOne._id
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Reply.deleteMany();
  await Thread.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Thread(threadOne).save();
  await new Reply(replyOne).save();
  await new Reply(replyTwo).save();
  await new Reply(replyThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  threadOneId,
  replyOne,
  replyTwo,
  replyThree,
  setupDatabase
};
