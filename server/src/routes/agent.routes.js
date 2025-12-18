const express = require('express');
const router = express.Router();
const { searchJobs, getJobDetails, applyJob, getMyApplications } = require('../controllers/agent.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/jobs', searchJobs);
router.get('/jobs/:id', getJobDetails);
router.post('/apply', applyJob);
router.get('/my-applications', getMyApplications);

module.exports = router;
