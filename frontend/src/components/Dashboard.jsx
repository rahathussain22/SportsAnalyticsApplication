import React from 'react'
import '../assets/styles/Dashboard.css'
import QuickAction from './QuickAction';
function Dashboard() {
    const activities = [
        { date: "2024-07-26 11:00 AM", action: "Added New Sport", details: "Soccer" },
        { date: "2024-07-26 10:30 AM", action: "Updated League", details: "Premier League" },
        { date: "2024-07-26 10:00 AM", action: "Published Article", details: "Match Preview: Team A vs Team B" },
    ];

    return (
        <div className='dashboard'>
            <div className="dashboard1">
                <h1>Dashboard</h1>
                <p>Welcome back,Alex</p>
            </div>
            <div className="dashboard2">
                <h2>Admin Information</h2>
                <div className="dashboard21">
                    <div className="dashboard211">
                        <h4>Name</h4>
                        <p>Alex Johnson</p>
                    </div>
                    <div className="dashboard211">
                        <h4>Email</h4>
                        <p>alex.johnson@email.com</p>
                    </div>
                    <div className="dashboard211">
                        <h4>Role</h4>
                        <p>Admin</p>
                    </div>
                    <div className="dashboard211">
                        <h4>Last Login</h4>
                        <p>2024-07-26 10:00 AM</p>
                    </div>
                </div>

            </div>
            
            <div className="dashboard3">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Action</th>
                            <th>Details</th>
                        </tr>
                            </thead>
                        <tbody>
                            {activities.map((a, i) => (
                                <tr key={i}>
                                    <td >{a.date}</td>
                                    <td className='tableAction'>{a.action}</td>
                                    <td>{a.details}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>
            <div className="dashboard4">
                <QuickAction />
            </div>
        </div>
    )
}

export default Dashboard