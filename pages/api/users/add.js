import { AddUser } from "@/mongodb/user";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      //req.body is the data we are sending
      let data = req.body;
      const { user, error } = await AddUser(data);
      if (error) throw new Error(error);
      return res.status(200).json({ user });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};

export default handler;
