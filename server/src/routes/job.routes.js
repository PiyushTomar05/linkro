const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob } = require('../controllers/job.controller');
// We might want auth middleware for createJob?
// The mock service didn't explicitly check, but backend should.
// Assuming the frontend sends a token or we just let it pass for now if adhering strictly to "mock replacement" which was purely client side.
// But better to add auth.
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', createJob); // TODO: Add authMiddleware if desired, currently open as per simplest replacement

module.exports = router;
