import { FetchUser } from "@/mongodb/user";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { username } = req.query;

      const { user, error } = await FetchUser({ username: username });
      if (error) throw new Error(error);

      return res.status(200).json({ user });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};

export default handler;

//dynamic api
