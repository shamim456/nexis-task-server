const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nexis.nwnxguc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("nexisApp").collection("users");
    // recieve user data
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      console.log(req.body);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // send user data
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello shamim");
});

app.listen(port, () => {
  console.log("server runnig");
});

// const uri = "mongodb+srv://nexisltd:<password>@nexis.nwnxguc.mongodb.net/?retryWrites=true&w=majority";
//
// client.connect(err => {
//
//   // perform actions on the collection object
//   client.close();
// });
