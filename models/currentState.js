const mongoose = require('mongoose');

const currentStateSchema = new mongoose.Schema({

    _id: {
        id: false
    },

    checkIn: {
        type: Boolean,
        required: true,

    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = currentStateSchema;