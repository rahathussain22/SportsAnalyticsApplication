import { League } from "../models/league.model.js";
import { Match } from "../models/matches.model.js";
// ===========================
// Add a new league
// ===========================
 const addLeague = async (req, res) => {
  try {
    const { name, country, season, logo, startDate, endDate, description } = req.body;

    // Check if the league already exists (same name + season)
    const existingLeague = await League.findOne({ name, season });
    if (existingLeague) {
      return res.status(400).json({
        success: false,
        message: "League with this name and season already exists."
      });
    }

    // Create a new league
    const newLeague = new League({
      name,
      country,
      season,
      logo,
      startDate,
      endDate,
      description
    });

    await newLeague.save();

    res.status(201).json({
      success: true,
      message: "League added successfully.",
      data: newLeague
    });
  } catch (error) {
    console.error("Error adding league:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const getLeaguesWithMatches = async (req, res) => {
  try {
    // Fetch leagues along with their associated teams and matches
    const leagues = await League.find()
      .populate({
        path: 'teams',
        select: 'name logo' // Specify the fields to be returned for the teams
      })
      .populate({
        path: 'matches',
        select: 'date startTime venue status prediction score halftimeScore fulltimeScore events statistics winner',
        populate: [
          {
            path: 'home',
            select: 'name logo'
          },
          {
            path: 'away',
            select: 'name logo'
          },
          {
            path: 'score.team',
            select: 'name logo'
          },
          {
            path: 'winner',
            select: 'name logo'
          },
          {
            path: 'league',
            select: 'name season country logo'
          }
        ]
      })
      .select('name country season startDate endDate logo description'); // You can adjust the fields as needed
    
    // Return the data in the response
    return res.status(200).json({
      success: true,
      leagues
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch leagues and matches'
    });
  }
};




export {addLeague, getLeaguesWithMatches}