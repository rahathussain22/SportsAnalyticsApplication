import { Team } from "../models/team.model.js";
import { League } from "../models/league.model.js";
// ===========================
// Add a new team
// ===========================
export const addTeam = async (req, res) => {
  try {
    const { name, logo, homeStadium, league } = req.body;

    // 1️⃣ Check if the team already exists
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "Team with this name already exists."
      });
    }

    // 2️⃣ Check if the league exists
    const existingLeague = await League.findById(league);
    if (!existingLeague) {
      return res.status(404).json({
        success: false,
        message: "League not found."
      });
    }

    // 3️⃣ Create new team
    const newTeam = new Team({
      name,
      logo,
      homeStadium,
      league
    });
    await newTeam.save();

    // 4️⃣ Automatically add this team to the league’s teams[] array
    existingLeague.teams.push(newTeam._id);
    await existingLeague.save();

    // 5️⃣ Return success response
    res.status(201).json({
      success: true,
      message: "Team added successfully and linked with league.",
      data: newTeam
    });

  } catch (error) {
    console.error("Error adding team:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// ===========================
// Get all teams
// ===========================
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("league", "name");
    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch teams.",
      error: error.message
    });
  }
};

// ===========================
// Get single team by ID
// ===========================
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("league", "name")
      .populate("matchHistory.matchId", "date venue");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found."
      });
    }

    res.status(200).json({
      success: true,
      data: team
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch team.",
      error: error.message
    });
  }
};
