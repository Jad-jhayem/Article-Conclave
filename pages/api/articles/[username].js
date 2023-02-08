import { getUserArticles } from "@/mongodb/article";

const handler = async (req, res) => {
  if (req.method == "GET") {
    try {
      const { username } = req.query;

      const { articles, error } = await getUserArticles(username);
      // email is not an object here that's why we didn't use {}

      if (error) throw new Error(error);

      return res.status(200).json({ articles });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};
export default handler;
