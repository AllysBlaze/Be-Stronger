const express = require('express');
const excercise = require('../models/excercise')
const user = require('../models/user');
const training = require('../models/training');
const progress = require('../models/progress')
const training_sets = require('../models/training_set')
// #region FUNKCJE

const changeweight = async (req, res) => {
    const id = res.get('id')
    const newWeight = req.body.waga;
    if (newWeight != '') {

        await user.updateUserweight(newWeight, id)
    }
    res.redirect('/home/weight')
}

const newTraining = async (req, res) => {
    const id = parseInt(res.get('id'))
    const tDate = req.body.date;
    const tCategory = req.body.activity;
    const hours = req.body.hours;

    var minutes = req.body.minutes;
    if (minutes == '')
        minutes = '00'
    const tDuration = hours.toString() + ':' + minutes.toString() + ':00'
    await training.addTraining([id, tDate, tCategory, tDuration])
    res.redirect('/home/newtraining')
}

const addSet = async (req, res) => {
    const id = parseInt(res.get('id'))
    const set_name = req.body.set_name
    var ex_name = req.body.nazwa
    const set_desc=req.body.set_desc;
    const rep = req.body.powt
    var values = [
        [id, set_name,set_desc],
        []
    ];
    var temp
    const series = req.body.set_series
    if (!Array.isArray(ex_name))
        ex_name = [ex_name]

    for (var i = 0; i < ex_name.length; i++) {
        temp = await excercise.getExcerciseId(ex_name[i])
        values[1].push([temp[0].excercise_id, parseInt(rep[i]),i+1])

    }
    const len = values[1].length
    var licznik=len+1
    for (var i = 1; i < series; i++) {
        for (var j = 0; j < len; j++) {
            values[1].push([values[1][j][0],values[1][j][1],licznik]);
            licznik+=1;
        }
    }
    await training_sets.addNewSet(values)
    res.redirect('/home/newset')
}


const endSet = async (req, res) => {
    const set_id = req.body.set_id;
    const user_id = parseInt(res.get('id'))
    await training.addCustomTraining([user_id, parseInt(set_id)])
    res.redirect('/home/userssets')
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


router.get('/userssets', async function (req, res) {
    const username = res.get('username');

    var id = await user.getUserID(username)
    id = id[0].user_id;
    const data = await training_sets.getSets()
    var set_id = [];
    var set_name = [];
    var set_dur = [];
    var set_desc = [];
    var set_author = [];
    for (var i = 0; i < data.length; i++) {
        set_id.push(data[i].set_id);
        set_name.push(data[i].set_name);
        set_dur.push(data[i].set_duration);
        set_desc.push(data[i].set_description)
        set_author.push(data[i].user_name)
    }

    res.render('userTraining', {
        user_name: username,
        photo_path: res.get('photo'),
        set_name: set_name,
        set_id: set_id,
        set_dur: set_dur,
        set_desc: set_desc,
        set_author: set_author
    })
});

router.get('/weight', async function (req, res) {

    const username = res.get('username');

    const id = await user.getUserID(username);

    const curWeight = await user.getUserWeight(id[0].user_id)
    var cw = curWeight[0].user_weight
    if (cw == null) {
        cw = 50
    }
    res.render('weight', {
        user_name: username,
        photo_path: res.get('photo'),
        curWeight: cw
    })
})
router.post('/weight', changeweight);


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

router.get('/newset', async function (req, res) {
    const username = res.get('username');
    const excercise_names = await excercise.getAllExcercises();
    var en = []
    var eid = []
    for (var i = 0; i < excercise_names.length; i++) {
        en.push(excercise_names[i].excercise_name)
        eid.push(excercise_names[i].excercise_id)
    }
    res.render('userTraining2', {
        user_name: username,
        photo_path: res.get('photo'),
        excercise_names: en,
        excercise_ids: eid
    })
})

router.post('/newset', addSet)


router.post('/sets/start', endSet)

router.get('/sets', async function (req, res) {
    const username = res.get('username');
    res.render('appTraining', {
        user_name: username,
        photo_path: res.get('photo')
    })
})

router.get('/sets/list', async function (req, res) {
    const ex = await training_sets.getSetDetails(req.query.id)
    const username = res.get('username');
    var names = [];
    var rep = [];
    var ex_id = [];
    var ex_desc = [];
    for (var i = 0; i < ex.length; i++) {
        names.push(ex[i].excercise_name);
        rep.push(ex[i].excercise_repetiton);
        ex_id.push(ex[i].excercise_id);
        ex_desc.push(ex[i].excercise_description)
    }
    res.render('exerciseList', {
        user_name: username,
        photo_path: res.get('photo'),
        names: names,
        rep: rep,
        ex_id: ex_id,
        set_id: req.query.id,
        button: true,
        ex_desc: ex_desc
    })
})

router.get('/sets/start', async function (req, res) {
    const username = res.get('username');
    const set = await training_sets.getSetDetails(req.query.id)
    var exName = [];
    var exRep = [];
    var exDur = [];
    for (var i = 0; i < set.length; i++) {
        exName.push(set[i].excercise_name)
        exRep.push(set[i].excercise_repetiton)
        exDur.push(set[i].time)
    }
    res.render('startTraining', {
        user_name: username,
        photo_path: res.get('photo'),
        exName: exName,
        exDur: exDur,
        exRep: exRep,
        set_id: req.query.id
    })
})


router.get('/cos', async function (req, res) {
    const username = res.get('username');
    const set = await training_sets.getSetDetails(4)
    console.log(set)
    res.render('exerciseList', {
        user_name: username,
        photo_path: res.get('photo'),
        set: set
    })
})

// #endregion

module.exports = router