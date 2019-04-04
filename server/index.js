const app = require("./server");

app.set("port", process.env.PORT);
app.listen(app.get("port"), () => {
  console.log(`Listening on ${app.get("port")}`);
});
