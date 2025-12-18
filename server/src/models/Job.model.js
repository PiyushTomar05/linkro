const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    salary: { type: String },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'], required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
    posted: { type: Date, default: Date.now }
});

jobSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

jobSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('Job', jobSchema);
