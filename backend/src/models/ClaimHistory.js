const mongoose = require('mongoose');

const claimHistorySchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Reference to the User model
        },
        pointsClaimed: {
            type: Number,
            required: true,
        },
        claimedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const ClaimHistory = mongoose.model('ClaimHistory', claimHistorySchema);
module.exports = ClaimHistory;