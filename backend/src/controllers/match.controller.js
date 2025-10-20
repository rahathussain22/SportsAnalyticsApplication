import { Match } from "../models/matches.model.js";
import { League } from "../models/league.model.js"; // Import League model
import mongoose from "mongoose"; // Import mongoose to handle ObjectId

// ===========================
// Add a New Match
// ===========================
const addMatch = async (req, res) => {
  try {
    const { matchNumber, home, away, date, venue, leagueId } = req.body; // Extract match details from the request body

    // 1️⃣ Ensure home and away are ObjectIds (use 'new' keyword to create ObjectId instances)
    const homeId = new mongoose.Types.ObjectId(home);
    const awayId = new mongoose.Types.ObjectId(away);

    // 2️⃣ Check if the home and away teams are the same
    if (homeId.equals(awayId)) {
      return res.status(400).json({
        success: false,
        message: "Home and Away teams cannot be the same."
      });
    }

    // 3️⃣ Check if the league exists by ID
    const existingLeague = await League.findById(leagueId);
    if (!existingLeague) {
      return res.status(404).json({
        success: false,
        message: "League not found."
      });
    }

    // 4️⃣ Create the new match
    const newMatch = new Match({
      matchNumber,
      home: homeId, // Use ObjectId for home
      away: awayId, // Use ObjectId for away
      date,
      venue,
      league: leagueId // Link the match with the league
    });
    await newMatch.save(); // Save the match to the database

    // 5️⃣ Add the match to the league's matches array
    existingLeague.matches.push(newMatch._id); // Push the new match's ID into the matches array
    await existingLeague.save(); // Save the updated league with the new match

    // 6️⃣ Return success response
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

export { addMatch };
