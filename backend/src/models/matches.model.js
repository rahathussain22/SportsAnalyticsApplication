import mongoose, { Schema } from "mongoose";

const matchSchema = new mongoose.Schema({
  // Basic Info
  matchNumber:{
    type:Number
  },
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
    enum: ['upcoming', 'live', 'completed', 'postponed', 'pending'],
    default: 'upcoming'
  },
  currentMinute: {
    type: Number,
    default: 0
  },

  // Scores
  score: [{
    team: { type: mongoose.Types.ObjectId, ref: 'Team' },
    score: { type: Number, default: 0 }
  }],
  halftimeScore: [{
    team: { type: mongoose.Types.ObjectId, ref: 'Team' },
    score: { type: Number, default: 0 }
  }],
  fulltimeScore: [{
    team: { type: mongoose.Types.ObjectId, ref: 'Team' },
    score: { type: Number, default: 0 }
  }],

  // Key Events
  events: [{
    type: {
      type: String,
      enum: ['goal', 'yellow_card', 'red_card', 'substitution', 'foul', 'penalty', 'offside'],
      required: true
    },
    minute: {
      type: Number      
    },
  }],

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
    type: mongoose.Types.ObjectId, // Reference to the winning team
    ref: 'Team',
    default: null
  },

  // Prediction
  prediction: {
  type: String
  },
}, { timestamps: true });

export const Match = mongoose.model('Match', matchSchema);
