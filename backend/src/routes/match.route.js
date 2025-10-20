import { Router } from "express";
import { addMatch } from "../controllers/match.controller.js";
const matchRouter = Router()
matchRouter.route('/addMatch').post(addMatch)
export {matchRouter}