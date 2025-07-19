const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new user
// @route   POST /api/users
// @access  Public
const addUser = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'User name is required' });
    }

    try {
        const userExists = await User.findOne({ name });
        if (userExists) {
            return res.status(400).json({ message: 'User with this name already exists' });
        }

        const user = new User({ name });
        const createdUser = await user.save();
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Claim random points for a user
// @route   POST /api/claim-points
// @access  Public
const claimPoints = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate random points between 1 and 10
        const pointsAwarded = Math.floor(Math.random() * 10) + 1;

        user.totalPoints += pointsAwarded;
        await user.save();

        // Create claim history entry
        const claim = new ClaimHistory({
            userId,
            pointsClaimed: pointsAwarded,
        });
        await claim.save();

        res.json({
            message: `Successfully claimed ${pointsAwarded} points for ${user.name}`,
            user: {
                _id: user._id,
                name: user.name,
                totalPoints: user.totalPoints,
                avatar: user.avatar,
            },
            pointsAwarded: pointsAwarded
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get claim history for a specific user
// @route   GET /api/claim-history/:userId
// @access  Public
const getUserClaimHistory = async (req, res) => {
    try {
        const history = await ClaimHistory.find({ userId: req.params.userId }).sort({ claimedAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    addUser,
    claimPoints,
    getUserClaimHistory
};