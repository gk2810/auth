const Schema = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res, next) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.send('Please enter details');
    }
    const userData = new Schema({
        name: name,
        email: email,
        password: password
    })

    await userData.save().then((result) => { res.send({ result }) }).catch((err) => { console.log(err) });
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!password) {
        res.send('Please enter password!');
    }
    const user = await Schema.findOne({ email: email })

    if (user) {
        let user_exist = bcrypt.compare(password, user.password);
        if (user_exist) {

            const token = jwt.sign({ id: user._id }, 'secret');
            res.cookie('jwt', token, { httponly: true, maxage: 10000 })
            console.log('token', token);
            res.send({
                data: {
                    name: user.name,
                    token
                }
            })
        }
    } else {
        next('user not exist')
        res.send('user not exist')
    }
}