import { AddSubscriber } from "@/mongodb/newsLetter";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      //req.body is the data we are sending
      let data = req.body;
      const { newsLetter, error } = await AddSubscriber(data);
      if (error) throw new Error(error);
      return res.status(200).json({ newsLetter });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};

export default handler;
