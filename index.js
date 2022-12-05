const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./controller/usercontroller');

mongoose.connect('mongodb+srv://stonecold:6356300098@cluster0.mcfmva2.mongodb.net').then('db connnected').catch((err)=>{console.log(err);});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/user/signin',user.signin)
app.get('/user/login',user.login);


app.listen(1234,()=>{
    console.log('server is running on 1234');
})