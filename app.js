const dotenv = require("dotenv").config(),

mongoose = require('mongoose'),
mongooseURL = `mongodb+srv://deep:Deep123@newdb.1tpog60.mongodb.net/new_db`;
mongoose.connect(mongooseURL);

const express = require('express');
const path = require('path');
const app = require('express')();
const http = require('http').Server(app);

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

http.listen(3000, ()=>{
    console.log("Server is running on 3000 port");
});
