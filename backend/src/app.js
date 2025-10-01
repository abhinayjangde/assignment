import express from "express";
import userRoutes from "./routes/user.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use("/api/auth", userRoutes);

export default app;
