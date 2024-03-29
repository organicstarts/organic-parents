const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Reply = require("./reply");
const Thread = require("./thread");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a postive number");
        }
      }
    },
    about: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "moderator"]
    },
    ban: {
      type: Boolean,
      default: false
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual("replies", {
  ref: "Reply",
  localField: "_id",
  foreignField: "owner"
});
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "organicparents");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function(next) {
  const user = this;
  user.firstName =
    user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
  user.lastName =
    user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user posts when user is removed
userSchema.pre("remove", async function(next) {
  const user = this;
  await Reply.updateMany(
    { owner: user._id },
    { content: "[deleted]", ownerName: "[deleted]" }
  );
  await Thread.updateMany(
    { owner: user._id },
    {
      content: "[deleted]",
      ownerName: "[deleted]",
      subject: "[deleted]"
    }
  );

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
