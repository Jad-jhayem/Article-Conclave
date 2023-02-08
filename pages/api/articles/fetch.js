import { getArticles } from "@/mongodb/article";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { articles, error } = await getArticles();
      if (error) throw new Error(error);

      return res.status(200).json({ articles });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};

export default handler;
