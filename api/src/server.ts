require("express-async-errors");
require("dotenv/config");
const cors = require("cors");
const express = require("express");
import { NextFunction, Request, Response } from "express";
import AppError from "./utils/AppError";
import { routes } from "./routes";
const cookieParser = require("cookie-parser");
import { connection } from "./database";

connection();
const app = express();
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3001",
  "http://localhost:3000",
  "https://fudexplorer.netlify.app",
];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
  })
);

app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error);
    if (error instanceof AppError)
      return response.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    return response.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
);

const NODE_ENV = process.env.NODE_ENV || "development";

const SERVER_PORT = process.env.SERVER_PORT || 8080;
app.listen(SERVER_PORT, () =>
  console.log("Server is running on " + NODE_ENV + " mode on PORT", SERVER_PORT)
);
