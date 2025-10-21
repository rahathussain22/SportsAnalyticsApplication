import { Router } from "express";
import { addMatch, getAllMatches, updateMatch } from "../controllers/match.controller.js";
const matchRouter = Router()
matchRouter.route('/addMatch').post(addMatch)
matchRouter.route('/updateMatch/:matchId').put(updateMatch)
matchRouter.route('/getMatches').get(getAllMatches)
export {matchRouter}