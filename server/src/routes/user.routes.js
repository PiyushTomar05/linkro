const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, uploadProfilePicture } = require('../controllers/user.controller');
const protect = require('../middlewares/authMiddleware');
const uploadProfile = require('../middlewares/profileUploadMiddleware');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/profile-picture', protect, uploadProfile.single('image'), uploadProfilePicture);

module.exports = router;
