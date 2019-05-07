const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String
  },
  content: {
      type: String
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Conversation"
  }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
