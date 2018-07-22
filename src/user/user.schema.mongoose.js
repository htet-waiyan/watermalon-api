const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: 'Firstname is required' },
    lastName: { type: String, required: 'Lastname is required' },
    email: String,
    password: String,
    dateJoin: { type: Date, default: moment() },
});

module.exports = UserSchema;