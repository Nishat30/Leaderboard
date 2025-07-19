import React from 'react';
import '../styles/Leaderboard.css';

function Leaderboard({ leaderboard }) {
    const topThree = leaderboard.slice(0, 3);
    const restOfLeaderboard = leaderboard.slice(3);

    const defaultProfilePic = "https://res.cloudinary.com/your-cloud-name/image/upload/v1/default-avatar.png"; // Replace with your default Cloudinary URL

    return (
        <div className="leaderboard-container glassmorphism-card">
            {leaderboard.length === 0 ? (
                <p>No users on the leaderboard yet.</p>
            ) : (
                <>
                    {topThree.length > 0 && (
                        <div className="top-three-container">
                            {/* Rank 2 */}
                            {topThree[1] && (
                                <div className="top-three-item rank-2">
                                    <div className="rank-circle">
                                        {/* REMOVED: <span className="rank">{topThree[1].rank}</span> */}
                                        <img src={topThree[1].avatar || defaultProfilePic} className="profile-pic-rank" alt={topThree[1].name} />
                                    </div>
                                    <span className="name">#2 {topThree[1].name}</span>
                                    <span className="points">{topThree[1].totalPoints} 🏆</span>
                                </div>
                            )}

                            {/* Rank 1 */}
                            {topThree[0] && (
                                <div className="top-three-item rank-1">
                                    <div className="rank-circle">
                                        {/* REMOVED: <span className="rank">{topThree[0].rank}</span> */}
                                        <img src={topThree[0].avatar || defaultProfilePic} className="profile-pic-rank" alt={topThree[0].name} />
                                    </div>
                                    <span className="name">#1 {topThree[0].name}</span>
                                    <span className="points">{topThree[0].totalPoints} 🏆</span>
                                </div>
                            )}

                            {/* Rank 3 */}
                            {topThree[2] && (
                                <div className="top-three-item rank-3">
                                    <div className="rank-circle">
                                        {/* REMOVED: <span className="rank">{topThree[2].rank}</span> */}
                                        <img src={topThree[2].avatar || defaultProfilePic} className="profile-pic-rank" alt={topThree[2].name} />
                                    </div>
                                    <span className="name">#3 {topThree[2].name}</span>
                                    <span className="points">{topThree[2].totalPoints} 🏆</span>
                                </div>
                            )}
                        </div>
                    )}

                    <ul className="leaderboard-list">
                        {restOfLeaderboard.map((user) => (
                            <li key={user._id} className="leaderboard-item">
                                <span className="rank">{user.rank}.</span>
                                <img
                                    src={user.avatar || defaultProfilePic}
                                    alt={user.name}
                                    className="profile-pic-circle"
                                />
                                <span className="name">{user.name}</span>
                                <span className="points">{user.totalPoints} 🏆</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Leaderboard;