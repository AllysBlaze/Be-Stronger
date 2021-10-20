const express = require('express');
const router = express.Router();

const {parseJwt}=require('../middleware/authToken');
const user =require('../models/user');
const training=require('../models/training');





router.get('/', async function (req, res) {
    const username=parseJwt(req.cookies['id']).username;
    const user_data= await user.getUserExtended(username)[0]
    res.send(user_data)
});

router.get('/history', async function(req,res){
    const username=parseJwt(req.cookies['id']).username; //do poprawy
    const id= await user.getUserID(username)
    const history= await training.getUserTrainingHistory(id[0].user_id);
    res.send(history)
})

module.exports=router