import dotenv from "dotenv"
dotenv.config(); 
import http from "http"
import { connectDB } from "./config/connectDb.js";
import app, { server } from "./app.js";



async function startDb() {
  await connectDB()
  console.log("Connected to Thriveon 360 Database")
}

startDb()
server.listen(process.env.PORT,()=>{
    console.log(`Server is Listening at Port: ${process.env.PORT}`)
})

