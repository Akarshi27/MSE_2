const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Middlewares
app.use(express.json());

app.use(cors({
  origin: "*"
}));

// ✅ Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api/grievances", require("./routes/grievanceRoutes"));

// ✅ Root check (for Render)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ IMPORTANT for deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});