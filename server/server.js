const app = require("./app");

app.set("port", process.env.PORT);
app.listen(app.get("port"), () => {
  console.log(`Listening on ${app.get("port")}`);
});
