import express from "express";
import http from "http"
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Server } from "socket.io";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// creating io connection server
const server= http.createServer(app)

// Middlewares
app.use(cors({
  origin: true, // Reflect the request origin, as defined by the request's Origin header
  credentials: true
}));

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve public.html directly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "public.html"));
});

import { userRoute } from "./src/routes/user.route.js";
app.use('/user',userRoute)
import { teamRouter } from "./src/routes/team.route.js";
app.use('/team',teamRouter)
import { leagueRouter } from "./src/routes/league.route.js";
app.use('/league', leagueRouter)
const io =new Server(server)
io.on('connection', (socket) =>{
console.log("a new user has connected", socket.id)
})

export default app;
