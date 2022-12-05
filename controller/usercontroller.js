const Schema = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res, next) => {

    const { name, email, password } = req.body;

    const userData = new Schema({
        name: name,
        email: email,
        password: password
    })

    await userData.save().then((result) => {

        let token = jwt.sign({ id: result._id }, 'secret')
        res.cookie('jwt', token, { httponly: true, maxage: 10000 })
        res.send({ result, token })
    }).catch((err) => { console.log(err) });
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await Schema.findOne({ email: email })

    if (user) {
        let user_exist = bcrypt.compare(password, user.password);
        if (user_exist) {

            // const token = jwt.sign({id:user._id},'secret');
            // console.log('token',token);
            next('user authenticated');
            res.send({
                data: {
                    name: user.name,
                    // token
                }
            })
        }
    } else {
        next('user not exist')
        res.send('user not exist')
    }
}