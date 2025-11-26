import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import stressTestRouter from "./routes/stressTest.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("⚡ AI Prompt Stress Tester Backend Running");
});

app.use("/api/stress-test", stressTestRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
