const jwt = require('jsonwebtoken');

exports.authentication =(req, res, next) => {
    let token = req.headers.cookie.split(' ')[1].split('=')[1];
    console.log(token);
    console.log(req.headers);
    jwt.verify(token,'secret',(err,decode)=>{
        if(err){
            res.send(err)
        }
        // res.send(decode.id)
        next();
    })
}