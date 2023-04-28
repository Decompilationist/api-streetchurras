const { Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const users = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    lastLogin: {
        type: Date
    },
    role: {
        type: String
    },
    active: {
        type: Boolean
    },
    firstName: {
        type: String
    },
    lasName: {
        type: String
    },
    birthday: {
        type: Date
    }
});


users.methods.checkPassword = async function(password) {
    return password === this.password;
}

module.exports = users;