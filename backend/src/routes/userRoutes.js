const express = require('express');
const { getUsers, addUser, claimPoints, getUserClaimHistory } = require('../controllers/userController');
const router = express.Router();

router.route('/').get(getUsers).post(addUser);
router.post('/claim-points', claimPoints);
router.get('/claim-history/:userId', getUserClaimHistory);

module.exports = router;