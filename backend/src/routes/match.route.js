import { Router } from "express";
import { addMatch, updateMatch } from "../controllers/match.controller.js";
const matchRouter = Router()
matchRouter.route('/addMatch').post(addMatch)
matchRouter.route('/updateMatch/:matchId').put(updateMatch)
export {matchRouter}