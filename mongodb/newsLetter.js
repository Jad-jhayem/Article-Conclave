import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
if (!URI) throw new Error("Please add your mongoDB URI to .env");

let client = new MongoClient(URI);

export async function AddSubscriber(data) {
  try {
    await client.connect();
    let db = client.db("articleconclave");
    let newsLetter = db.collection("newsLetter");
    //console.log(user);

    const result = await newsLetter.insertOne(data);
    //console.log(result);

    return { newsLetter: result };
  } catch (e) {
    return { error: "Failed to add subscriber" };
  } finally {
    await client.close();
  }
}
