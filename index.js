const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5rfsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("assignment-11-test");
    const productCollection = database.collection("services");
    // const orderCollection = database.collection("orders");

    //GET services API
    app.get("/services", async (req, res) => {
      const cursor = productCollection.find({});
      services = await cursor.toArray();

      res.send({
        services,
      });
    });
//get single post details
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: ObjectId(id) };
      const service = await productCollection.findOne(query);
      // console.log('load user with id: ', id);
      res.json(service);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Assignment 11 server is running");
});

app.listen(port, () => {
  console.log("Server is running at port", port);
});
