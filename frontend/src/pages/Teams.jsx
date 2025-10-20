import React, { useEffect, useState } from "react";
import axios from "axios";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Example using env variable for base URL
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/team`);
        setTeams(response.data.data); // backend sends teams inside "data"
      } catch (err) {
        setError("Failed to fetch teams.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            <strong>{team.name}</strong> — {team.league?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
