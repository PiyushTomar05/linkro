const User = require('../models/User.model');
const Application = require('../models/Application.model');

exports.getPublicStats = async (req, res) => {
    try {
        const companiesCount = await User.countDocuments({ role: 'recruiter' });
        const candidatesCount = await User.countDocuments({ role: 'agent' });
        const placementsCount = await Application.countDocuments({ status: 'hired' });

        // Satisfaction is mocked for now as we don't have a feedback model
        const satisfaction = 98;

        res.status(200).json({
            companies: companiesCount,
            candidates: candidatesCount,
            placements: placementsCount,
            satisfaction: satisfaction
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Server error fetching stats' });
    }
};
