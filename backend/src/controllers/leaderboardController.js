const User = require('../models/User');

// @desc    Get leaderboard (sorted by totalPoints)
// @route   GET /api/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({}).sort({ totalPoints: -1 }); // Sort descending
        // Assign ranks (optional, can be done on frontend too but good for API to provide)
        const rankedLeaderboard = leaderboard.map((user, index) => ({
            _id: user._id,
            name: user.name,
            totalPoints: user.totalPoints,
            rank: index + 1,
            avatar: user.avatar,
        }));
        res.json(rankedLeaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLeaderboard
};