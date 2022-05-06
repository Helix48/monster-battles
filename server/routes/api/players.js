const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  const players = await loadPlayersCollection();
  res.send(await players.find({}).toArray());
});

router.get("/:name", async (req, res) => {
  const players = await loadPlayersCollection();
  res.send(await players.findOne({ name: req.params.name }));
});

router.post("/", async (req, res) => {
  const players = await loadPlayersCollection();
  await players.insertOne({
    name: req.body.name,
    exp: req.body.exp,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(201).send();
});

router.delete("/:id", async (req, res) => {
  const players = await loadPlayersCollection();
  await players.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(200).send();
});

async function loadPlayersCollection() {
  const uri =
    "mongodb+srv://helix:helix@vue-express.pg8oa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = await mongodb.MongoClient.connect(uri, {
    useNewUrlParser: true,
  });

  return client.db("vue-express").collection("players");
}

module.exports = router;