import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'  //returns type of rquest, status code and response

import {connectToDatabase} from './db/connection'
import appRouter from './routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()

//middlewares
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//remove it in production
app.use(morgan("dev"))

app.use("/api/v1", appRouter)


//connections and listeners
connectToDatabase()
.then(() => {
    app.listen(5000, ()=>console.log("Server running on localhost"))
})
.catch((err) => console.log(err))
