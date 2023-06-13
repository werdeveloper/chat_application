const express = require('express');
const userRoute = express();

const path = require('path');
const multer = require('multer');

const bodyParser = require('body-parser');

const auth = require('./../middlewares/auth');

const session = require('express-session');
const { SESSION_SECRET } = process.env;
console.log(SESSION_SECRET);
userRoute.use(session({secret: SESSION_SECRET}));

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended: true}));

userRoute.use(express.static(path.join(__dirname, '../public')));
userRoute.set('view engine', 'ejs');
userRoute.set('views', './views');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: (req, file, cb)=>{
        const name = Date.now()+file.originalname;
        cb(null, name);
    }
});

const upload = multer({storage: storage});

const userCotroller = require('./../controllers/userController');

userRoute.get('/register', auth.isLogout, userCotroller.registerLoad);
userRoute.post('/register', upload.single('image'), userCotroller.register);  // File Upload with Single

userRoute.get('/', auth.isLogout, userCotroller.loadLogin);
userRoute.post('/', userCotroller.login);
userRoute.get('/logout', auth.isLogin, userCotroller.logout);

userRoute.get('/dashboard', auth.isLogin, userCotroller.loadDashboard);

userRoute.get('*', (req, res)=>{
    res.redirect('/');
})

module.exports = userRoute;