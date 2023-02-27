require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,useUnifiedTopology: true

},(err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("successfully connected")
    }
})

//ROUTES
const expressLayouts = require('express-ejs-layouts');
const mainRouter = require('./routes/main');
const hostelRouter = require('./routes/hostels');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

// Additional files
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(methodOverride('_method'));

// Middleware
app.use(express.static('public'));
bp = require("body-parser");
app.use(bp.urlencoded({limit:'10mb', extended:false}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/",mainRouter);
app.use("/hostels",hostelRouter);
app.use("/auth",authRouter);
app.use("/admin",adminRouter);

app.listen(process.env.PORT || 3000)