import { authenticated } from "server/middlewares/authenticated";

export async function handler(_, res) {
  return res.status(200).json({ message: "ok" });
}

export default authenticated(handler);
