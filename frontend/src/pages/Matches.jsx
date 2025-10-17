import React, { useState } from 'react'
import '../assets/styles/Matches.css';
import { useNavigate } from 'react-router-dom';

function Matches() {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('Upcoming');
    const tabs = ['Upcoming', 'Live', 'Past'];
      const matches = [
    { match: 'Team A vs Team B', date: '2024-03-15 14:00', status:"Scheduled"},
    { match: 'Team C vs Team D',date: '2024-03-16 16:30',status:"Scheduled" },
    { match: 'Team E vs Team F', date: '2024-03-17 18:00', status:"Scheduled" },
    { match: 'Team G vs Team H',date: '2024-03-18 15:45',status:"Scheduled" },
    { match: 'Team I vs Team J', date: '2024-03-19 17:15', status:"Scheduled"},
  ];
  return (
    <div className='matches'>
        <div className="matches1">
            <h1>Matches</h1>
              <button onClick={() => navigate('/addmatches')}>+ Add Match</button>
        </div>
        <div className="matches2">
            <ul>
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
            <table>
                <thead>
                    <tr>
                        <th>Match</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
          {matches.map((Match, index) => (
            <tr key={index}>
              <td>{Match.match}</td>
              <td>{Match.date}</td>
              <td>{Match.status}</td>
            </tr>
          ))}
        </tbody>
            </table>
        </div>
    </div>
  )
}

export default Matches