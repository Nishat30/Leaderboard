import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Leaderboard from './components/Leaderboard';
import UserSelection from './components/UserSelection';
import ClaimButton from './components/ClaimButton';
import './styles/index.css'; // For global styles and background
import background from './assets/bg-img.jpg';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);
    const [lastClaimMessage, setLastClaimMessage] = useState(''); // To display random points awarded

    // Fetch all users
    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/users`);
            setUsers(response.data);
            if (response.data.length > 0 && !selectedUserId) {
                // Select first user by default if no user is selected
                setSelectedUserId(response.data[0]._id);
            } else if (response.data.length > 0 && selectedUserId) {
                // If a user was already selected, make sure it's still valid or re-select
                const userExists = response.data.some(user => user._id === selectedUserId);
                if (!userExists) {
                    setSelectedUserId(response.data[0]._id);
                }
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [selectedUserId]); // Dependency array to prevent infinite loop

    // Fetch leaderboard
    const fetchLeaderboard = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/leaderboard`);
            setLeaderboard(response.data);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
        fetchLeaderboard();
        // Set up an interval to refresh leaderboard every few seconds if you want
        // const interval = setInterval(fetchLeaderboard, 5000); // refresh every 5 seconds
        // return () => clearInterval(interval); // Cleanup on component unmount
    }, [fetchUsers, fetchLeaderboard]);

    // Handle adding a new user
    const handleAddUser = async (userName) => {
        try {
            const response = await axios.post(`${API_URL}/users`, { name: userName });
            alert(`User "${response.data.name}" added successfully!`);
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error('Error adding user:', error.response ? error.response.data.message : error.message);
            alert(`Error adding user: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    // Handle claiming points
    const handleClaimPoints = async () => {
        if (!selectedUserId) {
            alert('Please select a user first!');
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/users/claim-points`, { userId: selectedUserId });
            setLastClaimMessage(`Claimed ${response.data.pointsAwarded} points for ${response.data.user.name}!`);
            fetchUsers(); // Update user points in selection list
            fetchLeaderboard(); // Update leaderboard
        } catch (error) {
            console.error('Error claiming points:', error.response ? error.response.data.message : error.message);
            setLastClaimMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className="app-container" style={{ backgroundImage: `url(${background})` }}>
            <div className="header">
                <h1>Leaderboard</h1>
            </div>

            {/* NEW: Combined Content Box */}
            <div className="main-content-box glassmorphism-card">
                {/* User Actions Section (now part of the combined box) */}
                <div className="actions-section">
                    <h2>User Actions</h2>
                    <UserSelection
                        users={users}
                        selectedUserId={selectedUserId}
                        onSelectUser={setSelectedUserId}
                        onAddUser={handleAddUser}
                    />
                    <ClaimButton onClaimPoints={handleClaimPoints} />
                    {lastClaimMessage && <p className="claim-message">{lastClaimMessage}</p>}
                </div>

                {/* Optional: A visual divider between sections */}
                <div className="vertical-divider"></div>

                {/* Leaderboard Section (now part of the combined box) */}
                <div className="leaderboard-section">
                    <Leaderboard leaderboard={leaderboard} />
                </div>
            </div>
            <p className="footer">
                © 2025| Made by Minhajuddin Ahmad 🤍
            </p>
        </div>
    );
}

export default App;