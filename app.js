//PACKAGES
const express=require('express');
const bodyparser = require('body-parser');
const session = require('express-session')
const cookieParser = require('cookie-parser')

//MODULES
const {connect,pool} = require('./db_files/connection');
const authRouter=require('./routes/auth')
const{port,cookie_secret}=require('./config')

//APP SET UP
const app=express();
app.set('view engine', 'ejs');

//APP USE
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookieParser())
app.use(session({ 
    secret: 'cookie_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.use('/auth',authRouter);

app.get('/',(req,res)=>{
    res.send('hello world')
})


const start= async()=>{
    try{
        await connect;
        app.listen(port,console.log(`Server is listening on port ${port}....`))

    } catch (error){
        console.log(error);
    };
}

start();