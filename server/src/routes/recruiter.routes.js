const express = require('express');
const router = express.Router();
const {
    postJob,
    getMyJobs,
    updateJobStatus,
    updateJobDetails,
    getJobApplications,
    updateApplicationStatus,
    getApplicationDetails,
    getJobDetails
} = require('../controllers/recruiter.controller');

const authMiddleware = require('../middlewares/authMiddleware');

// All routes here require being a logged-in recruiter
// Ideally, we'd have a roleMiddleware too, but for now we trust authMiddleware + logic
router.use(authMiddleware);

router.post('/jobs', postJob);
router.get('/jobs', getMyJobs);
router.get('/applications', getJobApplications); // Get all (can filter by jobId)
router.get('/applications/:id', getApplicationDetails); // Get single + mark viewed

router.patch('/applications/:id/status', updateApplicationStatus);
router.get('/jobs/:id', getJobDetails);
router.patch('/jobs/:id/status', updateJobStatus);
router.put('/jobs/:id', updateJobDetails);

module.exports = router;
