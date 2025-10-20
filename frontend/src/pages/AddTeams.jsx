import React, { useState } from "react";
import { showSuccess, showError } from '../utils/Toast';
import '../assets/styles/AddTeams.css'
import axios from "axios";

function AddTeams() {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    homeStadium: "",
    league: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/team/addTeam`, formData);
      showSuccess(response.data.message);
    } catch (error) {
      showError(error.response?.data?.message || "Error adding league");
    }
  };

  return (
    <div className="AddTeams">
      <h2>Add New Team</h2>
      <div className="AddTeamsFormContainer">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Team Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>logo:</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>homeStadium:</label>
            <input
              type="text"
              name="homeStadium"
              value={formData.homeStadium}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>league:</label>
            <input
              type="text"
              name="league"
              value={formData.league}
              onChange={handleChange}
            />
          </div>
          <div className="submitContainer">
            <button type="submit">Add Team</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeams;
