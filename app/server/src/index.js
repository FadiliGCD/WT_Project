const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const authRoutes = require("./routes/auth.routes");   // ← ADD THIS

const app = express();

app.use(cors());
app.use(express.json());

// Health test route
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server running" });
});

// Register auth routes
app.use("/api/auth", authRoutes);   // ← ADD THIS

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });