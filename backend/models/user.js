const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 30,
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 300,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 30,
    },
    events: {
        type: 'Mixed',
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('User', UserSchema);
