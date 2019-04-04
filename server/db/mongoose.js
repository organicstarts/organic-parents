const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/organic-parents-db", {
  useNewUrlParser: true,
  useCreateIndex: true
});

