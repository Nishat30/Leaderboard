import React, { useState } from 'react';
import '../styles/UserSelection.css'; // Create this CSS file

function UserSelection({ users, selectedUserId, onSelectUser, onAddUser }) {
    const [newUserName, setNewUserName] = useState('');

    const handleAddUserClick = () => {
        if (newUserName.trim()) {
            onAddUser(newUserName.trim());
            setNewUserName('');
        } else {
            alert('Please enter a user name.');
        }
    };

    return (
        <div className="user-selection-container">
            <div className="select-user-group">
                <label htmlFor="user-select">Select User:</label>
                <select
                    id="user-select"
                    value={selectedUserId}
                    onChange={(e) => onSelectUser(e.target.value)}
                    className="user-select-dropdown"
                >
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name} ({user.totalPoints} points)
                        </option>
                    ))}
                </select>
            </div>

            <div className="add-user-group">
                <input
                    type="text"
                    placeholder="New user name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="add-user-input"
                />
                <button onClick={handleAddUserClick} className="add-user-button">
                    Add User
                </button>
            </div>
        </div>
    );
}

export default UserSelection;