import "dotenv/config";
import express from "express";
import cors from "cors";
import { menuRouter } from "./routes/menu.js";
import { chatRouter } from "./routes/chat.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRouter);
app.use("/api/chat", chatRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Wokwise API listening on http://localhost:${PORT}`);
});
