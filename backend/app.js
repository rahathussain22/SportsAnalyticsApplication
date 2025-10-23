import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Server } from "socket.io";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log("A new user has connected", socket.id);
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
app.use(cors({
  origin: true, 
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/",getLeaguesWithMatches);
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "public.html"));
// });

import { userRoute } from "./src/routes/user.route.js";
app.use('/user', userRoute);
import { teamRouter } from "./src/routes/team.route.js";
app.use('/team', teamRouter);
import { leagueRouter } from "./src/routes/league.route.js";
app.use('/league', leagueRouter);
import { matchRouter } from "./src/routes/match.route.js";
import { getLeaguesWithMatches } from "./src/controllers/league.controller.js";
app.use('/match', matchRouter);
export { server, io };
export default app;
