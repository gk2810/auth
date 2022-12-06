let JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../model/userModel');
const mongoose = require('mongoose')

module.exports = function (passport) {
    console.log('hello');
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'secret',
            },
            function (jwt_payload, cb) {

                userModel.findById({_id:mongoose.Types.ObjectId(jwt_payload.id)},function(err,result){
                    if(err){
                        return cb(err,false)
                    }if(result){
                        cb(null,result)
                    }else{
                        cb(null,false)
                    }
                })
                console.log('jwt_payload',jwt_payload);
            }
        )
    )
}