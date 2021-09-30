const express=require('express');
const app=express();


const connect = require('./db_files/connection');


app.get('/',(req,res)=>{
    res.send('hello world')
})

app.get('/login',(req,res)=>{
    res.send('<h1>login page</h1>')
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