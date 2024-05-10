require('express-async-errors')
require('dotenv/config')
const cors = require('cors')
const express = require('express')
import { NextFunction, Request, Response } from "express"
import AppError from "./utils/AppError"
import { routes } from "./routes"
const cookieParser = require("cookie-parser")

const app = express()
app.use(cookieParser())
app.use(cors({
    credentials: true
}))
app.use(express.json())
app.use(routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error)
    if (error instanceof AppError)
        return response.status(error.status).json({
            status: error.status,
            message: error.message
        })
    return response.status(500).json({
        status: 500,
        message: 'Internal Server Error'
    })
})

const SERVER_PORT = process.env.SERVER_PORT || 3000
app.listen(SERVER_PORT, () => console.log('Server is running on PORT', SERVER_PORT))