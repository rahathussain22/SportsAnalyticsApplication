import mongoose, { Schema } from "mongoose";

const matchSchema = new mongoose.Schema({
  // Basic Info
  home: {
    type: mongoose.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  away: {
    type: mongoose.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: 'League',
    required: true
  },

  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed', 'postponed'],
    default: 'upcoming'
  },
   currentMinute: {
    type: Number,
    default: 0
  },

  // Scores
  score: {
    teamA: { type: Number, default: 0 },
    teamB: { type: Number, default: 0 }
  },
  halftimeScore: {
    teamA: { type: Number, default: 0 },
    teamB: { type: Number, default: 0 }
  },

  // Referee and Officials
 

  // Key Events
  events: [
    {
      type: {
        type: String,
        enum: ['goal', 'yellow_card', 'red_card', 'substitution', 'foul', 'penalty', 'offside'],
      },
      minute: Number,
      player: String,
      assistingPlayer: String,
      team: String,
      description: String
    }
  ],

  // Team Statistics (aggregated)
  statistics: {
    home: {
      possession: Number,
      shotsOnTarget: Number,
      shotsOffTarget: Number,
      corners: Number,
      fouls: Number,
      offsides: Number,
      passes: Number,
      passAccuracy: Number,
      yellowCards: Number,
      redCards: Number,
    },
    away: {
      possession: Number,
      shotsOnTarget: Number,
      shotsOffTarget: Number,
      corners: Number,
      fouls: Number,
      offsides: Number,
      passes: Number,
      passAccuracy: Number,
      yellowCards: Number,
      redCards: Number,
    }
  },

  // Winner Info
  winner: {
    type: String, // 'teamA', 'teamB', or 'draw'
    default: null
  },
  
  prediction:{
    type: String

  }

}, { timestamps: true });

export const Match = mongoose.model('Match', matchSchema);
