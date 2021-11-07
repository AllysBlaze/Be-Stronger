const express = require('express');

const {
    parseJwt
} = require('../middleware/authToken');
const user = require('../models/user');
const training = require('../models/training');
const progress = require('../models/progress')
const training_sets = require('../models/training_set')
// #region FUNKCJE

const changeweight = async (req, res) => {
    const id = res.get('id')
    const newWeight = req.body.weight;
    await user.updateUserweight(newWeight, id)
}

const newTraining = async (req, res) => {
    const id = parseInt(res.get('id'))
    const tDate = req.body.date;
    const tCategory = req.body.activity;
    const hours = req.body.hours;
    const minutes = req.body.minutes;
    const tDuration = hours.toString() + ':' + minutes.toString() + ':00'
    await training.addTraining([id, tDate, tCategory, tDuration])
    res.redirect('/home/newtraining')
}
// #endregion

// #region Router
const router = express.Router();

router.get('/', async function (req, res) {
    res.redirect('/home/profile')
});

router.get('/history', async function (req, res) {
    const username = res.get('username');
    const id = res.get('id')
    const history = await training.getUserTrainingHistory(id);
    var act = [];
    var duration = [];
    var date = []
    for (var i = 0; i < history.length; i++) {
        if (history[i].training_category == 'custom') {
            act.push(history[i].set_name)
        } else {
            act.push(history[i].training_category)
        }
        duration.push(history[i].training_duration)
        var d = history[i].training_date;
        var month = d.getMonth() + 1
        var year = d.getFullYear()
        var day = d.getDate()

        date.push(day.toString() + '.' + month.toString() + '.' + year.toString())
    }
    res.render('history', {
        user_name: username,
        photo_path: res.get('photo'),
        act: act,
        date: date,
        duration: duration
    })
});


router.get('/profile', async function (req, res) {
    const username = res.get('username');
    const id = res.get('id');
    const us = await user.getUserExtended(id)
    var age = '';
    if (us[0].user_birth)
        age = new Date().getFullYear() - us[0].user_birth.getFullYear()
    res.render('profil', {
        user_name: username,
        photo_path: res.get('photo'),
        weight: us[0].user_weight,
        height: us[0].user_height,
        age: age
    });
});

router.get('/progress', async function (req, res) {
    const username = res.get('username');
    const id = res.get('id');
    const data1 = await progress.getTrainingCategories(id);
    const data2 = await progress.getTrainingWeeklyProgress(id);
    const goal = await user.getUserGoal(id);
    var x1 = [];
    var y1 = [];
    for (var i = 0; i < data1.length; i++) {
        x1.push(data1[i].training_category);
        y1.push(data1[i].training_count);
    }
    var x2 = [];
    var y2 = [];
    var labels = [];
    for (var i = 0; i < data2.length; i++) {
        x2.push(data2[i].week);
        y2.push(data2[i].time);
        labels.push(data2[i].time_label);
    }
    res.render('progress', {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        labels: labels,
        user_name: username,
        goal: goal[0].goal,
        photo_path: res.get('photo')
    })
});


router.get('/start', async function (req, res) {
    const username = res.get('username');
    const data = await training_sets.getSets(id[0].user_id)
    res.send(data)
});

router.get('/weight', async function (req, res) {

    const username = res.get('username');

    const id = await user.getUserID(username);

    const curWeight = await user.getUserWeight(id[0].user_id)
    var cw=curWeight[0].user_weight
    if (cw==null){
       cw=50 
    }
    res.render('weight', {
        user_name: username,
        photo_path: res.get('photo'),
        curWeight: cw
    })
})
//router.post('/weight', changeweight);


router.get('/newtraining', async function (req, res) {
    const username = res.get('username');
    var categories = await training.getCategories();
    categories = categories[0].cat.replace('(', '').replace(')', '').split(',')
    categories = categories.map(x => x.replace(/'/g, ''))
    res.render('addNewActivity', {
        user_name: username,
        photo_path: res.get('photo'),
        categories: categories
    })
})
router.post('/newtraining', newTraining)

router.get('/cos', async function (req, res) {
    const username = res.get('username');
    res.render('appTraining', {
        user_name: username,
        photo_path: res.get('photo')
    })
})

// #endregion

module.exports = router