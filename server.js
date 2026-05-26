const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined in .env");
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NestFinder API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 NestFinder API running on http://localhost:${PORT}`);
  });
});
