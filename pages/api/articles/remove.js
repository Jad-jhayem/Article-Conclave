import { deleteArticle } from "@/mongodb/article";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let data = req.body;
      const { articles, error } = await deleteArticle(data);
      if (error) throw new Error(error);
      return res.status(200).json({ articles });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};

export default handler;
