import { Router } from "express";
import { addTeam, getAllTeams } from "../controllers/team.controller.js";
const teamRouter = Router()
teamRouter.route('/addTeam').post(addTeam)
teamRouter.route('/getAllTeams').get(getAllTeams)
export {teamRouter}