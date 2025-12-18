const Job = require('../models/Job.model');
const Application = require('../models/Application.model');

// @desc    Post a new job
// @route   POST /api/recruiter/jobs
exports.postJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            recruiterId: req.user._id,
            posted: new Date()
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get jobs posted by current recruiter
// @route   GET /api/recruiter/jobs
exports.getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ recruiterId: req.user._id });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get job details (only if owner)
// @route   GET /api/recruiter/jobs/:id
exports.getJobDetails = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, recruiterId: req.user._id });
        if (!job) {
            return res.status(404).json({ message: 'Job not found or unauthorized' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get applications for recruiter's jobs
// @route   GET /api/recruiter/applications
exports.getJobApplications = async (req, res) => {
    try {
        // optional: filter by specific jobId if passed in query
        const { jobId } = req.query;

        // First find all jobs by this recruiter
        const jobs = await Job.find({ recruiterId: req.user._id }).select('_id');
        const jobIds = jobs.map(j => j._id);

        let filter = { jobId: { $in: jobIds } };
        if (jobId) {
            // Ensure the requested jobId belongs to this recruiter
            if (!jobIds.find(id => id.toString() === jobId)) {
                return res.status(403).json({ message: 'Unauthorized to view applications for this job' });
            }
            filter.jobId = jobId;
        }

        const applications = await Application.find(filter)
            .populate('jobId', 'title company')
            .populate('applicantId', 'name email skills'); // Populate applicant details

        // Transform for frontend
        const transformed = applications.map(app => ({
            ...app.toJSON(),
            jobTitle: app.jobId?.title,
            company: app.jobId?.company,
            applicantName: app.applicantId?.name,
            applicantEmail: app.applicantId?.email,
            skills: app.applicantId?.skills,
        }));

        res.json(transformed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
