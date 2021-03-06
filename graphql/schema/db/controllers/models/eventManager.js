const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const casual        = require('casual');
//so mongoose can stop throwing that warning
mongoose.Promise = global.Promise;

const eventManagerSchema  = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    verificationCode: {
        type: Number,
        required: true,
        default: casual.integer(from = 1000, to = 9999)
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const EventManager = mongoose.model('EventManager', eventManagerSchema );
module.exports = EventManager;
