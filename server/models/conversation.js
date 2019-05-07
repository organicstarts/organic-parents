const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: {
    type: [String]
  }
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
