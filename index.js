const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "production") {
  process.env.API_URL = "localhost:8088/";
} else {
  process.env.API_URL = "noahs-app-api.herokuapp.com/";
}

app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/src"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listening on port ${port}`);
  }
});
