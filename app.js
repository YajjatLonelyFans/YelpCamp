if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const sanitizeV5 = require("./utils/mongoSanitizeV5");
const express = require('express')
const app = express();
app.set('query parser', 'extended');
const path = require('path');
const mongoose = require('mongoose');
const catchAsync=require('./utils/catchAsync')
const ExpressError= require("./utils/ExpressError")
const Campground = require('./models/campgrounds');
const Joi= require("joi");
const methodOverride = require('method-override');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const ejsMate  = require('ejs-mate');
const { title } = require('process');
const Review = require('./models/reviews');
const campgroundRoutes = require('./Routes/Campgrounds');
const reviewRoutes = require('./Routes/review');
const userRoutes = require('./Routes/users');
const flash = require('connect-flash');
const User = require('./models/user');
const passport = require('passport');
const { name } = require('ejs');
const LocalStrategy = require('passport-local').Strategy;
const dbUrl = process.env.Db_Url;

app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(sanitizeV5({ replaceWith: '_'}));


app.use(express.urlencoded({extended:true}))

mongoose.connect(dbUrl)
const db = mongoose.connection;
db.on( "error", console.error.bind(console , 'connection error:'));
db.once('open', ()=>{
    console.log('database connected')
})

app.engine('ejs' , ejsMate)
app.set('view engine' , 'ejs')
app.set('views' ,  path.join(__dirname , 'views'))

const store = mongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});

const sessionConfig = {
    name: 'session',
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, 
        maxAge: 1000 * 60 * 60 * 24 * 7 
    }
}
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());    
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.use('/', userRoutes);
app.use("/campgrounds" , campgroundRoutes)
app.use("/campgrounds/:id/reviews" , reviewRoutes)


app.get('/' , (req , res)=>{
    res.render('home')
})



app.all(/(.*)/,(req,res,next)=>{
    next(new ExpressError("Page Not Found" , 404))
})

app.use((err,req,res,next)=>{
    const {statuscode = 500}=err
    if(!err.message) err.message = "Oh No, Something Went Wrong!!"
    res.status(statuscode).render('error' , {err})
    
})

app.listen(3000 , ()=>{
    console.log('connected to port 3000')
})