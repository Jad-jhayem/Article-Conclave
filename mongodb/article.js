import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
if (!URI) throw new Error("Please add your mongoDB URI to .env");

let client = new MongoClient(URI);

export async function getArticles() {
  try {
    await client.connect();
    let db = client.db("articleconclave");

    let articles = db.collection("articles");

    const result = await articles
      .find({})
      .limit(20)
      .map((ar) => ({ ...ar, _id: ar._id.toString() }))
      .toArray();

    return { articles: result };
  } catch (e) {
    return { error: "Failed to fetch articles" };
  } finally {
    await client.close();
  }
}

export async function insertArticle(data) {
  try {
    await client.connect();
    let db = client.db("articleconclave");
    let articles = db.collection("articles");

    const result = await articles.insertOne(data);

    return { articles: result };
  } catch (e) {
    return { error: "Failed to insert articles" };
  } finally {
    await client.close();
  }
}

export async function getUserArticles(username) {
  try {
    await client.connect();
    let db = client.db("articleconclave");
    let articles = db.collection("articles");

    const result = await articles
      .find({ username: username })
      .map((ar) => ({ ...ar, _id: ar._id.toString() }))
      .toArray();

    return { articles: result };
  } catch (e) {
    return { error: "Failed to get the articles of the user" };
  } finally {
    await client.close();
  }
}

export async function deleteArticle(data) {
  try {
    await client.connect();
    let db = client.db("articleconclave");
    let articles = db.collection("articles");
    const result = await articles.deleteOne(data);
    return { articles: result };
  } catch (e) {
    return { error: "Failed to delete the article" };
  } finally {
    await client.close();
  }
}

export async function updateArticle(data) {
  try {
    await client.connect();
    let db = client.db("articleconclave");
    let articles = db.collection("articles");
    const result = await articles.replaceOne(
      { title: data.title, username: data.username },
      data
    );
    return { articles: result };
  } catch (e) {
    return { error: "Failed to update the article" };
  } finally {
    await client.close();
  }
}
