const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: String
})

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(this.password, salt);
        this.password = hashpassword;
        next();
    } catch (error) {
        console.log(error);
        next(error)
    }
})

module.exports = mongoose.model('User', userSchema);