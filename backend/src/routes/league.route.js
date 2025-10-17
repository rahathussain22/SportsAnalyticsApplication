import { Router } from "express";
import { addLeague } from "../controllers/league.controller.js";
const leagueRouter = Router()
leagueRouter.route('/addLeague').post(addLeague)
export {leagueRouter}