import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectionToDB from "./config/connectDB.js";
import cors from "cors";
await connectionToDB();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/api/v1/test", (req, res) => {
    res.json({ Hi: "Welcome to the eVoucher App" });
})

// middleware for error handling and not found routes
app.use(notFound);
app.use(errorHandler);


// main router for app
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tag", tagRoutes);

const PORT = process.env.PORT || 1997;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})