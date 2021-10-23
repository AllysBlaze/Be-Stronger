const express = require('express');
const router = express.Router();

const {
    parseJwt
} = require('../middleware/authToken');
const user = require('../models/user');
const training = require('../models/training');
const progress=require('../models/progress')


router.get('/', async function (req, res) {
    const username = parseJwt(req.cookies['id']).username;
    const user_data = await user.getUserExtended(username)
    res.send(user_data)
});

router.get('/history', async function (req, res) {
    const username = parseJwt(req.cookies['id']).username; //do poprawy
    const id = await user.getUserID(username)
    const history = await training.getUserTrainingHistory(id[0].user_id);
    res.send(history)
})


router.get('/user', function (req, res, next) {
    res.render('profil');
})

router.get('/progress',async function(req,res){
    const username = parseJwt(req.cookies['id']).username; //do poprawy
    const id = await user.getUserID(username)
    const data1=await progress.getTrainingCategories(id[0].user_id);
    const data2=await progress.getTrainingWeeklyProgress(id[0].user_id);
    res.send({data1,data2})
})

module.exports = router