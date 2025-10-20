import dotenv from "dotenv"
dotenv.config(); 
import http from "http"
import { connectDB } from "./config/connectDb.js";
import app from "./app.js";


async function startDb() {
  await connectDB()
  console.log("Connected to Thriveon 360 Database")
}

startDb()
app.listen(process.env.PORT,()=>{
    console.log(`Server is Listening at Port: ${process.env.PORT}`)
})

