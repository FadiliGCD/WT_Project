const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server running" });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });