import { Router } from "express";
import { addTeam } from "../controllers/team.controller.js";
const teamRouter = Router()
teamRouter.route('/addTeam').post(addTeam)
export {teamRouter}