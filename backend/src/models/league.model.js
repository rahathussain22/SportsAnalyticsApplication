import mongoose, { Schema } from "mongoose";

const leagueSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  country: {
    type: String,
    required: true
  },

  season: {
    type: String, // e.g., "2025/2026"
    required: true
  },

  logo: {
    type: String, // URL to league logo
    default: ""
  },

  // Associated Teams
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team"
    }
  ],

  // Associated Matches
  matches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Match"
    }
  ],

  // Optional Info
  startDate: {
    type: Date
  },

  endDate: {
    type: Date
  },

  description: {
    type: String
  }

}, { timestamps: true });

export const League = mongoose.model("League", leagueSchema);
