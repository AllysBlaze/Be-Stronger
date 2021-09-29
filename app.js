const express=require('express');

const app=express();


app.get('/',(req,res)=>{
    res.send('hello world')
})

app.get('/login',(req,res)=>{
    res.send('<h1>login page</h1>')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
  })