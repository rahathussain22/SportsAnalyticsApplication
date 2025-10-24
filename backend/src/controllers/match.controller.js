import { Match } from "../models/matches.model.js";
import { League } from "../models/league.model.js";
import { io } from "../../app.js"; // Importing the Socket.io instance
import mongoose from "mongoose";
const addMatch = async (req, res) => {
  try {
    const { matchNumber, home, away, date, venue, leagueId } = req.body;

    const homeId = new mongoose.Types.ObjectId(home);
    const awayId = new mongoose.Types.ObjectId(away);

    if (homeId.equals(awayId)) {
      return res.status(400).json({
        success: false,
        message: "Home and Away teams cannot be the same."
      });
    }

    const existingLeague = await League.findById(leagueId);
    if (!existingLeague) {
      return res.status(404).json({
        success: false,
        message: "League not found."
      });
    }

    const newMatch = new Match({
      matchNumber,
      home: homeId,
      away: awayId,
      date,
      venue,
      league: leagueId
    });
    await newMatch.save();

    existingLeague.matches.push(newMatch._id);
    await existingLeague.save();

    // Emit the new match data to all connected clients
    io.emit('matchAdded', {
      success: true,
      message: "New match added",
      matchData: newMatch
    });

    res.status(201).json({
      success: true,
      message: "Match added successfully and linked with league.",
      data: newMatch
    });

  } catch (error) {
    console.error("Error adding match:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { matchId } = req.params;  // Get match ID from URL
    const { score, events, status, currentMinute } = req.body; // Get data from request body

    // Find the match by its ID
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found."
      });
    }

    // Update match fields if provided
    if (score) {
      match.score = score;  // Update score
    }

    if (events) {
      match.events = [...match.events, ...events];  // Add new events
    }

    if (status) {
      match.status = status;  // Update status (e.g., "live", "completed")
    }

    if (currentMinute !== undefined) {
      match.currentMinute = currentMinute;  // Update current minute
    }

    // Save the updated match data
    await match.save();

    // Emit the updated match data to all connected clients
   io.emit('matchUpdated', {
  success: true,
  message: "Match updated",
  matchData: match
});

    // Return success response
    res.status(200).json({
      success: true,
      message: "Match updated successfully.",
      data: match
    });

  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};


const getAllMatches = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;  // Default to page 1 and 10 matches per page

    // Convert page and limit to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Find all matches with pagination
    const matches = await Match.find()
      .skip((pageNumber - 1) * limitNumber)  // Skip the previous pages' data
      .limit(limitNumber)  // Limit the number of matches returned
      .populate({
        path: 'home',
        select: 'name logo' // Populate home team with name and logo
      })
      .populate({
        path: 'away',
        select: 'name logo' // Populate away team with name and logo
      })
      .populate({
        path: 'score.team',
        select: 'name logo' // Populate teams in score with name and logo
      })
      .populate({
        path: 'winner',
        select: 'name logo' // Populate winner team with name and logo
      })
      .select('matchNumber date venue status prediction score halftimeScore fulltimeScore events statistics winner startTime') // Select relevant match fields

    // Count total matches for pagination info
    const totalMatches = await Match.countDocuments();

    // Return the data in the response
    res.status(200).json({
      success: true,
      message: "Matches fetched successfully.",
      data: matches,
      pagination: {
        totalMatches,
        totalPages: Math.ceil(totalMatches / limitNumber),
        currentPage: pageNumber,
        perPage: limitNumber
      }
    });

  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};



export { addMatch, updateMatch, getAllMatches };
