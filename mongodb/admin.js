import { resolveBreakpointValues } from "@mui/system/breakpoints";

const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URI;

if (!URI) throw new Error("Please add your MongoDB URI to .env");

let client = new MongoClient(URI);

export async function getArticles() {
  try {
    await client.connect();
    let db = await client.db("articleconclave");
    let articles = await db.collection("articles");

    const result = await articles.find({}).limit(10).toArray();
    return { articles: result };
  } catch (e) {
    return { error: " failed to fetch articles" };
  } finally {
    await client.close();
  }
}

export async function insertArticles() {
  try {
    await client.connect();
    let db = await client.db("articleconclave");
    let articles = await db.collection("articles");

    const result = await articles.insertOne({
      title: "random title",
      author: "random author",
      date_published: "random date",
      category: "random category",
      content: "random content",
    });
  } catch (e) {
    return { error: " failed to insert articles" };
  } finally {
    await client.close();
  }
}
