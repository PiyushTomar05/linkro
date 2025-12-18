const Application = require('../models/Application.model');
const Job = require('../models/Job.model');

// @desc    Get applications with filters and joined data
// @route   GET /api/applications
// @access  Private (Recruiter/Agent)
exports.getApplications = async (req, res) => {
    try {
        const { recruiterId, applicantId } = req.query;
        let filter = {};

        // Filter by applicant is direct
        if (applicantId) {
            filter.applicantId = applicantId;
        }

        // Filter by recruiter requires finding jobs first
        if (recruiterId) {
            const jobs = await Job.find({ recruiterId }).select('_id');
            const jobIds = jobs.map(j => j._id);

            // If we also had applicantId, we intersect, otherwise we just restrict to these jobs
            filter.jobId = { $in: jobIds };
        }

        const applications = await Application.find(filter)
            .populate('jobId', 'title company')
            .populate('applicantId', 'name email');

        // Flatten logic to match frontend expectations if necessary
        // Frontend expects: { ...app, jobTitle: job.title, company: job.company, applicantName: applicant.name, applicantEmail: applicant.email }

        const transformed = applications.map(app => {
            const appObj = app.toJSON();
            return {
                ...appObj,
                jobTitle: app.jobId ? app.jobId.title : 'Unknown',
                company: app.jobId ? app.jobId.company : 'Unknown',
                applicantName: app.applicantId ? app.applicantId.name : 'Unknown',
                applicantEmail: app.applicantId ? app.applicantId.email : 'Unknown',
                // Remove nested objects if we want a flat structure, or keep them. 
                // Mock service did flattening, so let's stick to that but keep original references just in case.
            };
        });

        res.json(transformed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Agent)
exports.applyJob = async (req, res) => {
    try {
        const { jobId, applicantId } = req.body;

        // Check if already applied
        const existing = await Application.findOne({ jobId, applicantId });
        if (existing) {
            return res.status(400).json({ message: 'Already applied' });
        }

        const application = await Application.create({
            jobId,
            applicantId,
            status: 'pending'
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
