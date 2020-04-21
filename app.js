const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Clients");

const port = process.env.PORT;

app.use(bodyParser.json());

const Clients = mongoose.model("clients");

const mongoUri = process.env.MONGODB_URL;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo xd");
});

mongoose.connection.on("error", (err) => {
  console.log("Ooopss ", err);
});

app.get("/", (req, res) => {
  Clients.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/send-data", (req, res) => {
  const clients = new Clients({
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
    phone: req.body.phone,
    picture: req.body.picture,
  });
  clients
    .save()
    .then((data) => {
      console.log(data), res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/delete", (req, res) => {
  Clients.findByIdAndDelete(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/update", (req, res) => {
  Clients.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("Server running " + port);
});
