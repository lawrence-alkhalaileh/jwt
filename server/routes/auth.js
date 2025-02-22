import express from "express";
import pool from "../db.js";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authenticateToken from "../middlewares/authenticateToken.js";

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists");
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING user_id",
      [name, email, hashedPassword]
    );

    const token = jwt.sign(
      { user: newUser.rows[0].user_id },
      process.env.jwtSecret,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "strict",
    });

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );

    if (checkUser.rows.length === 0) {
      return res.json("User Not Found !");
    }

    const user = checkUser.rows[0];

    console.log(user.user_password)

    const checkPassword = await compare(password, user.user_password);

    if (!checkPassword) {
      return res.json("Incorrect password !");
    }

    const token = jwt.sign({ user: user.user_id }, process.env.jwtSecret, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "strict",
    });

    return res.json("logged in");
  } catch (error) {
    console.log(error);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
});

router.get("/check", authenticateToken, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("server error");
  }
});

export default router;
