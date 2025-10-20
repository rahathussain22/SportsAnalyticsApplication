import mongoose, { Schema } from "mongoose";

const teamSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  logo: {
    type: String, // URL to team logo
    default: ""
  },

  homeStadium: {
    type: String
  },

 // Match History (array of matches the team has played)
  matchHistory: [
    {
      matchId: { type: Schema.Types.ObjectId, ref: "Match" }
    }
  ],

  // Team Statistics (aggregate / seasonal)
  statistics: {
    matchesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    goalsScored: { type: Number, default: 0 },
    goalsConceded: { type: Number, default: 0 },
    cleanSheets: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },
    points: { type: Number, default: 0 } // For league standings
  }

}, { timestamps: true });

export const Team = mongoose.model("Team", teamSchema);
