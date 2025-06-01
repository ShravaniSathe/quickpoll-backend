import express from "express";
import cors from "cors";
import pollRoutes from "./routes/poll.routes";
import adminRoutes from "./routes/admin.routes";
import { connectDB } from "./config/db";

const app = express();
// connect to Db
connectDB();
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/polls", pollRoutes);
app.use("/api/admin", adminRoutes);

export default app;
