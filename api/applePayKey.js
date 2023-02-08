const bodyParser = require("body-parser");
const app = require("express")();
const fs = require("fs").promises;

app.use(bodyParser.json());
app.get("/", async (req, res) => {
  const key = await fs.readFile(
    "./api/apple-developer-merchantid-domain-association",
    "utf8"
  );
  res.status(200).send(key);
});

module.exports = app;
