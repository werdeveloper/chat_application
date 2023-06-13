const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerLoad = async(req, res) => {
    try{
        res.render('register');
    } catch(err){
        console.log(err.message);
    }
}

const register = async(req, res) => {
    try{
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: req?.file?.filename?'images/'+ req?.file?.filename:'',
            password: passwordHash
        });

        await user.save();
        res.render('register', {message: 'User registered successfully'});
    } catch(err){
        console.log(err.message);
    }
}

const loadLogin = async(req, res) => {
    try{
        res.render('login');
    } catch(err){
        console.log(err.message);
    }
}

const login = async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email: email});
        if(userData){
            let comparePass = await bcrypt.compare(password, userData.password);
            if(comparePass){    
                req.session.user = userData;    // Save user data on session
                res.redirect('/dashboard');
            } else{
                res.render('login', {message: "Email or Password is Invalid"});
            }
        } else{
            res.render('login', {message: "Email or Password is Invalid"});
        }        
    } catch(err){
        console.log(err.message);
    }
}

const logout = async(req, res) => {
    try{
        req.session.destroy();
        res.redirect('/login');        
    } catch(err){
        console.log(err.message);
    }
}

const loadDashboard = async(req, res) => {
    try{
        res.render('dashboard', {user: req.session.user});  // get the sesssion data 
    } catch(err){
        console.log(err.message);
    }
}


module.exports = {
    registerLoad,
    register,
    loadLogin,
    login,
    logout,
    loadDashboard
};

