import express from "express";
import cors from "cors";
import router from "./routes/auth.js";
import profile from "./routes/profile.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = 5000;

app.use("/auth", router);
app.use("/profile", profile);

app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
