const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./controller/usercontroller');
const auth = require('./controller/authentication')
const passport = require('passport');
require('./controller/passport')(passport);


mongoose.connect('mongodb+srv://stonecold:6356300098@cluster0.mcfmva2.mongodb.net').then('db connnected').catch((err) => { console.log(err); });

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/user/signin', user.signin)
app.get('/user/login', user.login);
// app.get('/data', auth.authentication,(req,res)=>{
//     res.send('ok authenticated')
// })
app.get('/data',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.send('ok authenticated')
})
app.listen(1234, () => {
    console.log('server is running on 1234');
})