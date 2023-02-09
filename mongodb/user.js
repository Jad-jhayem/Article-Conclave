import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
if (!URI) throw new Error("Please add your mongoDB URI to .env");

//const { isExist, setIsExist } = useExist();

let client = new MongoClient(URI);

export async function FetchUser(data) {
  try {
    await client.connect();
    let db = client.db("articleconclave");
    let user = db.collection("user");

    const result = await user
      .find(data)
      .map((ar) => ({ ...ar, _id: ar._id.toString() }))
      .toArray();
    return { user: result };
  } catch (e) {
    return { error: "Failed to log in" };
  } finally {
    await client.close();
  }
}

export async function AddUser(data) {
  try {
    await client.connect();
    let db = client.db("articleconclave");
    let user = db.collection("user");

    //condition to check if user exist
    let x = await FetchUser({ username: data.username });
    if (x.lenght > 0) {
      return { user: [] };
    } else {
      const result = await user.insertOne(data);
      return { user: result };
    }
  } catch (e) {
    return { error: "Failed to add user" };
  } finally {
    await client.close();
  }
}
