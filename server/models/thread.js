const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    categories: {
      type: [String],
      required: true
    },
    ownerName: {
      type: String,
      required: true,
      trim: true
    },
    lock: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);
threadSchema.virtual("replies", {
  ref: "Reply",
  localField: "_id",
  foreignField: "thread"
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
