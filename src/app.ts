import express from "express";
import cors from "cors";
import pollRoutes from "./routes/poll.routes";
import adminRoutes from "./routes/admin.routes";
import { connectDB } from "./config/db";

const app = express();
// connect to Db
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/polls", pollRoutes);
app.use("/api/admin", adminRoutes);

export default app;
