import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS__ORIGIN || "http://localhost:3000",
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Use userRouter for the /api/v1/users endpoint
app.use("/api/v1/users", userRouter);

export { app };
