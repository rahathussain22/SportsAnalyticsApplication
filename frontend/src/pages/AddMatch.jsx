import React, { useState } from 'react';
import InputField from '../components/InputField';
import TeamLineupField from '../components/TeamLineupField';
import FormSection from '../components/FormSection';
import '../assets/styles/AddMatch.css'; // The combined CSS file

const AddMatch = () => {
  const [formData, setFormData] = useState({
    teamA: '', teamB: '', dateTime: '', venue: '', league: '', sport: 'Football',
    status: 'Upcoming', teamALineup: '', teamBLineup: '',
    teamAWinProb: '', teamBWinProb: '', overUnderGoals: '', btts: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted!', formData);
    // Submit logic here
  };

  return (
    <div className="add-new-match-container">
      <form onSubmit={handleSubmit} className="add-new-match-form">
        <h2>Add New Match</h2>
        
        {/* --- 1. Match Information Section --- */}
        <FormSection title="Match Information">
          <InputField label="Team A" name="teamA" placeholder="Enter Team A name" onChange={handleInputChange} value={formData.teamA} />
          <InputField label="Team B" name="teamB" placeholder="Enter Team B name" onChange={handleInputChange} value={formData.teamB} />
          
          <InputField label="Date & Time" name="dateTime" placeholder="mm/dd/yyyy, --:--" onChange={handleInputChange} value={formData.dateTime} />
          <InputField label="Venue" name="venue" placeholder="Enter venue" onChange={handleInputChange} value={formData.venue} />
          
          <InputField label="League" name="league" placeholder="Enter league" onChange={handleInputChange} value={formData.league} />
          <InputField 
            label="Sport" 
            name="sport" 
            options={[{ label: 'Football' }, { label: 'Basketball' }, { label: 'Hockey' }]}
            onChange={handleInputChange} 
            value={formData.sport}
          />
        </FormSection>

        {/* --- 2. Match Status Section --- */}
        <FormSection title="Match Status">
          <InputField 
            label="Status" 
            name="status" 
            options={[{ label: 'Upcoming' }, { label: 'In-Progress' }, { label: 'Finished' }]}
            onChange={handleInputChange} 
            value={formData.status}
          />
          {/* Note: This section only has one input, so it will take up one column in the two-column grid. */}
        </FormSection>

        {/* --- 3. Team Information Section --- */}
        <FormSection title="Team Information">
          <TeamLineupField 
            label="Team A Lineup" 
            name="teamALineup" 
            placeholder="Enter comma-separated player names"
            onChange={handleInputChange} 
            value={formData.teamALineup}
          />
          <TeamLineupField 
            label="Team B Lineup" 
            name="teamBLineup" 
            placeholder="Enter comma-separated player names"
            onChange={handleInputChange} 
            value={formData.teamBLineup}
          />
        </FormSection>

        {/* --- 4. Predictions Section --- */}
        <FormSection title="Predictions (Optional)" isPredictionSection={true}>
          <InputField label="Team A Win %" name="teamAWinProb" placeholder="e.g., 55" onChange={handleInputChange} value={formData.teamAWinProb} />
          <InputField label="Team B Win %" name="teamBWinProb" placeholder="e.g., 45" onChange={handleInputChange} value={formData.teamBWinProb} />
          <InputField label="Over/Under Goals" name="overUnderGoals" placeholder="e.g., 2.5" onChange={handleInputChange} value={formData.overUnderGoals} />
          <InputField 
            label="Both Teams to Score (BTTS)" 
            name="btts" 
            options={[{ label: 'Select an option', value: '' }, { label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} 
            onChange={handleInputChange} 
            value={formData.btts}
             className="full-width"
          />
        </FormSection>

        {/* --- Form Actions --- */}
        <div className="form-actions">
          <button type="button" className="btn btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn btn-save">
            Save Match
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMatch;