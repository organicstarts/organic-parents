const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Thread"
    }
  },
  {
    timestamps: true
  }
);

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
