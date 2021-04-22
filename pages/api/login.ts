import jwt from "jsonwebtoken";
import { authenticateGoogle } from "server/middlewares/authenticate_google";

async function handler(req, res) {
  const token = jwt.sign({ id: req.user._id }, process.env.NEXT_SERVER_SECRET_JWT);
  const opts = { httpOnly: true, sameSite: true, signed: true, path: '/' };
  res.cookie("jwt", token, opts);
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ user: req.user.profile });
}

export default authenticateGoogle(handler);
