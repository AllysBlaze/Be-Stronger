const express = require('express');

const router = express.Router();

const {
    parseJwt
} = require('../middleware/authToken');
const user = require('../models/user');
const training = require('../models/training');
const progress = require('../models/progress')
const training_sets=require('../models/training_set')

router.get('/', async function (req, res) {
    const username = parseJwt(req.cookies['id']).username;
    //const user_data = await user.getUserExtended(username)
    //res.send(user_data)
    res.render('profilLayout', {
        user_name: username
    })
});

router.get('/history', async function (req, res) {
    const username = parseJwt(req.cookies['id']).username; //do poprawy
    const id = await user.getUserID(username)
    const history = await training.getUserTrainingHistory(id[0].user_id);
    res.send(history)
});


router.get('/user', async function (req, res, next) {
    
    const username = parseJwt(req.cookies['id']).username;
    res.render('profil',{user_name:username});
});

router.get('/progress', async function (req, res) {
    const username = parseJwt(req.cookies['id']).username; //do poprawy
    const id = await user.getUserID(username);
    const data1 = await progress.getTrainingCategories(id[0].user_id);
    const data2 = await progress.getTrainingWeeklyProgress(id[0].user_id);
    var x1 = [];
    var y1 = [];
    for (var i = 0; i < data1.length; i++) {
        x1.push(data1[i].training_category);
        y1.push(data1[i].training_count);
    }
    var x2 = [];
    var y2 = [];
    for (var i = 0; i < data2.length; i++) {
        x2.push(data2[i].week);
        y2.push(data2[i].training_count);
    }

    res.render('progress', {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        user_name: username
    })
});


router.get('/start',async function(req,res){
    const username = parseJwt(req.cookies['id']).username; //do poprawy
    const id = await user.getUserID(username);
    const data= await training_sets.getSets(id[0].user_id)
    res.send(data)
});

router.post('/weigth',async function(req,res){
    res.send('waga')
})
router.post('/weigth',changeWeigth);

// FUNKCJE

const changeWeigth=async(req,res)=>{
    const username = parseJwt(req.cookies['id']).username; //do poprawy
    const id = await user.getUserID(username);
    const newWeigth=req.body.weigth;
    await user.updateUserWeigth(newWeigth,id[0].user_id)
}

module.exports = router