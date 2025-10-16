import { Router } from "express";
import {
  login,
  register,
  refreshAccessToken,
  logout,
} from "../controllers/auth.controller.js";

const userRoute = Router();

// Authentication Routes
userRoute.route("/register").post(register);  // Register new user
userRoute.route("/login").post(login);        // Login existing user
userRoute.route("/refresh").post(refreshAccessToken); // Get new access token using refresh token
userRoute.route("/logout").post(logout);      // Logout user

export { userRoute };
