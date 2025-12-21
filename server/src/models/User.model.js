const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'recruiter', 'agent'], required: true },

    // Recruiter fields
    company: { type: String },

    // Agent fields
    skills: [{ type: String }],
    resume: { type: String }, // Path to resume file

    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    joined: { type: Date, default: Date.now }
});

// To match frontend expectations where needed, we can use a virtual 'id'
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('User', userSchema);
