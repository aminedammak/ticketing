import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }
  //Returns the payload if jwt is valid. If not, throw the error.
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
