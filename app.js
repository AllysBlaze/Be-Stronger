//PACKAGES
const express=require('express');
const bodyparser = require('body-parser');

//MODULES
const {connect,pool} = require('./db_files/connection');
const authRouter=require('./routes/auth')


//APP SET UP
const app=express();
app.set('view engine', 'ejs');

//APP USE
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use('/auth',authRouter);

app.get('/',(req,res)=>{
    res.send('hello world')
})


const start= async()=>{
    try{
        await connect;
        app.listen(5000,console.log('Server is listening on port 5000....'))

    } catch (error){
        console.log(error);
    };
}

start();