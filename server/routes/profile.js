import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import pool from "../db.js";
const profile = express.Router();

profile.get("/", authenticateToken, (req, res) => {
  const userId = req.user.user;
  pool.query(
    "SELECT * FROM posts WHERE user_id = $1",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Error fetching posts:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ posts: result.rows });
    }
  );
});

export default profile;
