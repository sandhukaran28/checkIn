const mongoose = require('mongoose');
const currentStateSchema = require('./currentState');

const personSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    currentState: [currentStateSchema]
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;