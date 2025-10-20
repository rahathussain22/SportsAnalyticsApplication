import { League } from "../models/league.model.js";

// ===========================
// Add a new league
// ===========================
export const addLeague = async (req, res) => {
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
