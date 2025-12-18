const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'interview', 'rejected', 'hired'], default: 'pending' },
    appliedAt: { type: Date, default: Date.now }
});

applicationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

applicationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('Application', applicationSchema);
