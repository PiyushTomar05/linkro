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
            .populate('applicantId', 'name email skills resume'); // Populate applicant details including resume

        // Transform for frontend
        const transformed = applications.map(app => ({
            ...app.toJSON(),
            jobTitle: app.jobId?.title,
            company: app.jobId?.company,
            applicantName: app.applicantId?.name,
            applicantEmail: app.applicantId?.email,
            skills: app.applicantId?.skills,
            resume: app.applicantId?.resume,
        }));

        res.json(transformed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update application status
// @route   PATCH /api/recruiter/applications/:id/status
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status, note } = req.body;
        const { id } = req.params;

        // Find application and populate job to check ownership
        const application = await Application.findById(id).populate('jobId');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Verify that the current recruiter owns the job associated with this application
        if (application.jobId.recruiterId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to update this application' });
        }

        application.status = status;
        application.lastStatusUpdatedAt = new Date();

        // Initialize timeline if it doesn't exist (for old records)
        if (!application.timeline) {
            application.timeline = [];
        }

        // Add to timeline
        application.timeline.push({
            status,
            note: note || '',
            updatedBy: req.user._id,
            updatedAt: new Date()
        });

        await application.save();

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single application details for recruiter (marks as viewed)
// @route   GET /api/recruiter/applications/:id
exports.getApplicationDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // Find application
        const application = await Application.findById(id)
            .populate('jobId', 'title company recruiterId')
            .populate('applicantId', 'name email skills resume');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Verify ownership
        if (application.jobId.recruiterId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Mark as viewed
        application.lastViewedByRecruiterAt = new Date();
        await application.save();

        const transformed = {
            ...application.toJSON(),
            jobTitle: application.jobId?.title,
            company: application.jobId?.company,
            applicantName: application.applicantId?.name,
            applicantEmail: application.applicantId?.email,
            skills: application.applicantId?.skills,
            resume: application.applicantId?.resume,
            // Explicitly include our new fields if transform removes them (it shouldn't based on schema options but good to be safe)
            lastViewedByRecruiterAt: application.lastViewedByRecruiterAt,
            lastStatusUpdatedAt: application.lastStatusUpdatedAt
        };

        res.json(transformed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update job status (e.g. close application)
// @route   PATCH /api/recruiter/jobs/:id/status
exports.updateJobStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        const job = await Job.findOne({ _id: id, recruiterId: req.user._id });

        if (!job) {
            return res.status(404).json({ message: 'Job not found or unauthorized' });
        }

        job.status = status;
        await job.save();

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update job details
// @route   PUT /api/recruiter/jobs/:id
exports.updateJobDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findOne({ _id: id, recruiterId: req.user._id });

        if (!job) {
            return res.status(404).json({ message: 'Job not found or unauthorized' });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
