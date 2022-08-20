import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect("your database code");
    const db = client.db();
    const meetUpCollections = db.collection("meetup");
    const result = await meetUpCollections.insertOne(data);
    console.log("here");
    console.log(result);
    client.close();
    res.status(201).json({ meetup: "onserted" });
  }
}

export default handler;
