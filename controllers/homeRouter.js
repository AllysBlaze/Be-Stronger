const express = require('express');

const {
    parseJwt
} = require('../middleware/authToken');
const user = require('../models/user');
const training = require('../models/training');
const progress = require('../models/progress')
const training_sets = require('../models/training_set')
const getUsernameID = require('../middleware/usernameID')
// #region FUNKCJE

const changeWeigth = async (req, res) => {
    const username = parseJwt(req.cookies['id']).username; //do poprawy
    const id = await user.getUserID(username);
    const newWeigth = req.body.weigth;
    await user.updateUserWeigth(newWeigth, id[0].user_id)
}

const newTraining = async (req, res) => {
    const username = parseJwt(req.cookies['id']).username; //do poprawy
    const id = await user.getUserID(username);
    const tDate = req.body.tDate;
    const tCategory = req.body.tCategory;
    const tDuration = req.body.tDuration;
    await training.addTraining([id[0].user_id, tDate, tCategory, tDuration])
}
// #endregion

// #region Router
const router = express.Router();

router.get('/', async function (req, res) {
    const username = res.get('username');
    res.render('profilLayout', {
        user_name: username
    })
});

router.get('/history',  async function (req, res) {
    const username = res.get('username');
    const id=res.get('id')
    const history = await training.getUserTrainingHistory(id);
    res.send(history)
});


router.get('/user',  async function (req, res, next) {

    const username = parseJwt(req.cookies['id']).username;
    res.render('profil', {
        user_name: username
    });
});

router.get('/progress',  async function (req, res) {
    const username = res.get('username');
    const id = res.get('id');
    const data1 = await progress.getTrainingCategories(id);
    const data2 = await progress.getTrainingWeeklyProgress(id);
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


router.get('/start',  async function (req, res) {
    const username = res.get('username');
    const data = await training_sets.getSets(id[0].user_id)
    res.send(data)
});

router.get('/weigth', async function (req, res) {
    res.send('waga')
})
router.post('/weigth', changeWeigth);


router.get('/newtraining',  async function (req, res) {
    const username = res.get('username');
    res.render('addNewActivity',{user_name:username})
})
router.post('/newtraining', newTraining)

// #endregion

module.exports = router