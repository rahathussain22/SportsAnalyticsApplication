import React, { useState } from "react";
import { showSuccess, showError } from '../utils/Toast';
import '../assets/styles/AddLeagues.css'
import axios from "axios";

function AddLeagues() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    season: "",
    logo: "",
    startDate: "",
    endDate: "",
    description: "",
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/league/addLeague`, formData);
      showSuccess(response.data.message);
    } catch (error) {
      showError(error.response?.data?.message || "Error adding league");
    }
  };

  return (
    <div className="AddLeagues">
      <h2>Add New League</h2>
      <div className="AddLeaguesFormContainer">
        <form onSubmit={handleSubmit}>
          <div>
            <label>League Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Season:</label>
            <input
              type="text"
              name="season"
              value={formData.season}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Logo URL:</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="submitContainer">
            <button type="submit">Add League</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLeagues;
