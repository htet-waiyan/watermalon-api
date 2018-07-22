const mongoose = require('mongoose');
const UserSchema = require('../user/user.schema.mongoose');
const User = mongoose.model('User',UserSchema);
require('dotenv').config();

console.log('Connecting to '+process.env.DB_URL);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const createTestUsers = () => {
    const user = new User({
        firstName: 'Htet',
        lastName: 'Wai Yan',
        email: 'h.waeyan@gmail.com',
        password: process.env.INIT_USER_PASSWD,
    });

    User.create(user, (error,user) => {
        if(error) throw error;

        console.log('User Successfully Created ',user);
    });
}

createTestUsers();