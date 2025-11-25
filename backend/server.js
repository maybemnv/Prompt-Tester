import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Prompt Stress Tester Backend Running");
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
