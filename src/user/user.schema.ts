import * as mongoose from 'mongoose';
import * as moment from 'moment';

export const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: 'Firstname is required' },
    lastName: { type: String, required: 'Lastname is required' },
    email: String,
    password: String,
    dateJoin: { type: Date, default: moment() },
});