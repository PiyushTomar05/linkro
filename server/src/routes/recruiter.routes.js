const express = require('express');
const router = express.Router();
const { postJob, getMyJobs, getJobDetails, getJobApplications } = require('../controllers/recruiter.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// All routes here require being a logged-in recruiter
// Ideally, we'd have a roleMiddleware too, but for now we trust authMiddleware + logic
router.use(authMiddleware);

router.post('/jobs', postJob);
router.get('/jobs', getMyJobs);
router.get('/jobs/:id', getJobDetails);
router.get('/applications', getJobApplications);

module.exports = router;
