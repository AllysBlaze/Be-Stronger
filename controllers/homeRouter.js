const express = require('express');
const excercise = require('../models/excercise')
const user = require('../models/user');
const training = require('../models/training');
const progress = require('../models/progress')
const training_sets = require('../models/training_set')


// #region FUNKCJE


const updatePhoto = async (req, res) => {
    const photo = '/images/profil_icons/' + req.body.avatar.toString() + '.png'
    console.log(photo)
    const id = res.get('id')
    try {
        await user.updatePhoto([photo, id])
    } catch (error) {
        console.log(error)
    }
    res.redirect('/home/profile')
}

const changeweight = async (req, res) => {
    const id = res.get('id')
    const newWeight = req.body.waga;
    if (newWeight != '') {
        try {
            await user.updateUserweight(newWeight, id)
        } catch (error) {
            console.log(error)
        }
        res.redirect('/home/weight')
    }
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
    try {
        await training.addTraining([id, tDate, tCategory, tDuration])
    } catch (error) {
        console.log(error)
    }
    res.redirect('/home/newtraining')
}

const addSet = async (req, res) => {
    const id = parseInt(res.get('id'))
    const set_name = req.body.set_name
    var ex_name = req.body.nazwa
    const set_desc = req.body.set_desc;
    var rep = req.body.powt
    const series = req.body.set_series
    var values = [
        [id, set_name, set_desc, series],
        []
    ];
    var temp
    if (!Array.isArray(ex_name))
        ex_name = [ex_name]

    if (!Array.isArray(rep))
        rep = [rep]
    for (var i = 0; i < ex_name.length; i++) {
        try {
            temp = await excercise.getExcerciseId(ex_name[i])
            values[1].push([temp[0].excercise_id, parseInt(rep[i]), i + 1])
        } catch (error) {
            console.log(error)
        }

    }
    try {
        await training_sets.addNewSet(values)
    } catch (error) {
        console.log(error)
    }
    res.redirect('/home/newset')
}


const endSet = async (req, res) => {
    const set_id = req.body.set_id;
    const user_id = parseInt(res.get('id'))
    try {
        await training.addCustomTraining([user_id, parseInt(set_id)])
    } catch (error) {
        console.log(error)
    }
    res.redirect('/home/userssets')
}


const getMonth = async (req, res) => {
    const data = new Date(req.body.month)
    const month = data.getMonth() + 1;
    const year = data.getFullYear();

    var dane;
    try {
        dane = await getProgressData(res.get('id'), month, year)
    } catch (error) {
        console.log(error)
    }
    res.render('progress', {
        x1: dane[0],
        y1: dane[1],
        x2: dane[2],
        y2: dane[3],
        labels: dane[4],
        user_name: res.get('username'),
        goal: dane[5],
        photo_path: res.get('photo'),
        month: data.toLocaleString('default', {
            month: 'long'
        })
    })
}

const getProgressData = async (id, month, year) => {
    var x1 = [];
    var y1 = [];
    var x2 = [];
    var y2 = [];
    var labels = [];
    var goal;
    try {
        const data1 = await progress.getTrainingCategories([id, year, month]);
        const data2 = await progress.getTrainingWeeklyProgress([id, year, month]);
        goal = await user.getUserGoal(id);

        for (var i = 0; i < data1.length; i++) {
            if (data1[i].training_category == 'custom')
                x1.push("zestaw treningowy");

            else
                x1.push(data1[i].training_category);
            y1.push(data1[i].training_count);
        }

        for (var i = 0; i < data2.length; i++) {
            x2.push(data2[i].week);
            y2.push(data2[i].time);
            labels.push(data2[i].time_label);
        }
    } catch (error) {
        console.log(error)
    }
    return [x1, y1, x2, y2, labels, goal[0].goal]

}

const updateUser = async (req, res) => {
    const user_name = res.get('username');
    var weight = req.body.weight;
    var height = req.body.height;
    var birthdate = req.body.age;
    var minutes = req.body.minutes;
    var hours = req.body.hours
    if (minutes == '')
        minutes = '00'
    const goal = hours.toString() + ':' + minutes.toString() + ':00'

    try {
        await user.updateUser(weight, height, birthdate, goal, user_name)
    } catch (error) {
        console.log(error)
    }
    res.redirect('/home/profile')
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
    var act = [];
    var duration = [];
    var date = []
    var img = [];
    var kcal = [];
    var ids=[];
    try {
        const history = await training.getUserTrainingHistory(id);
        for (var i = 0; i < history.length; i++) {
            kcal.push(history[i].kcal)
            if (history[i].training_category == 'custom') {
                act.push(history[i].set_name)
            } else {
                act.push(history[i].training_category)
            }
            ids.push(history[i].id)
            duration.push(history[i].training_duration)
            var d = history[i].training_date;
            var month = d.getMonth() + 1
            var year = d.getFullYear()
            var day = d.getDate()

            date.push(day.toString() + '.' + month.toString() + '.' + year.toString())
        }
    } catch (error) {
        console.log(error)
    }
    for (var i = 0; i < act.length; i++) {
        switch (act[i]) {
            case 'jazda na rowerze':
                img.push('bike');
                break;
            case 'jazda na rolkach':
                img.push('rollerblade');
                break;
            case 'skakanie na skakance':
                img.push('skipping-rope');
                break;
            case 'pływanie':
                img.push('swimming');
                break;
            case 'trekking':
                img.push('running');
                break;
            case 'jazda na nartach':
                img.push('alpine');
                break;
            case 'joga':
                img.push('yoga');
                break;
            default:
                img.push('trening');
                break;
        }
    }

    res.render('history', {
        user_name: username,
        photo_path: res.get('photo'),
        act: act,
        date: date,
        duration: duration,
        img: img,
        kcal:kcal,
        ids:ids
    })
});


router.get('/profile', async function (req, res) {
    const username = res.get('username');
    const id = res.get('id');
    var age = '';
    var us;
    var birth;
    try {
        us = await user.getUserExtended(id)
        if (us[0].user_birth)
            age = new Date().getFullYear() - us[0].user_birth.getFullYear()
        var d = us[0].user_birth;
        var month = (d.getMonth() + 1).toString()
        var year = d.getFullYear()
        var day = d.getDate().toString();
        if (day.length == 1)
            day = '0' + day
        if (month.length == 1)
            month = '0' + month;
        birth = year + '-' + month + '-' + day


    } catch (error) {
        console.log(error)
    }
    res.render('profil', {
        user_name: username,
        photo_path: res.get('photo'),
        weight: us[0].user_weight,
        height: us[0].user_height,
        age: age,
        goal: us[0].training_weekly_time_goal,
        birth: birth
    });
});

router.post('/profile', updatePhoto)
router.post('/profile/info', updateUser)

router.get('/progress', async function (req, res) {
    const username = res.get('username');
    const id = res.get('id');
    const data = new Date();
    const month = data.getMonth() + 1;
    const year = data.getFullYear();
    var dane;
    try {
        dane = await getProgressData(id, month, year)
    } catch (error) {
        console.log(error)
    }
    res.render('progress', {
        x1: dane[0],
        y1: dane[1],
        x2: dane[2],
        y2: dane[3],
        labels: dane[4],
        user_name: username,
        goal: dane[5],
        photo_path: res.get('photo'),
        month: data.toLocaleString('default', {
            month: 'long'
        })
    })
});

router.post('/progress', getMonth)

router.get('/userssets', async function (req, res) {
    const username = res.get('username');
    var set_id = [];
    var set_name = [];
    var set_dur = [];
    var set_desc = [];
    var set_author = [];
    var kcal = [];
    var img = [];
    const id = res.get('id');
    try {
        const data = await training_sets.getSets()

        for (var i = 0; i < data.length; i++) {
            set_id.push(data[i].set_id);
            set_name.push(data[i].set_name);
            set_dur.push(data[i].set_duration);
            set_desc.push(data[i].set_description)
            set_author.push(data[i].user_name);
            kcal.push(data[i].kcal)
            img.push(data[i].user_photo)
        }
    } catch (error) {
        console.log(error)
    }
    const txt = 'Skorzystaj z treningów przygotowanych przez innych użytkowników'
    res.render('userTraining', {
        user_name: username,
        photo_path: res.get('photo'),
        set_name: set_name,
        set_id: set_id,
        set_dur: set_dur,
        set_desc: set_desc,
        set_author: set_author,
        texth1: txt,
        kcal: kcal,
        img: img
    })
});

router.get('/minesets', async function (req, res) {
    const username = res.get('username');
    var set_id = [];
    var set_name = [];
    var set_dur = [];
    var set_desc = [];
    var set_author = [];
    const id = res.get('id');
    var kcal = []
    var img = [];
    try {
        const data = await training_sets.getUserSets(id)

        for (var i = 0; i < data.length; i++) {
            set_id.push(data[i].set_id);
            set_name.push(data[i].set_name);
            set_dur.push(data[i].set_duration);
            set_desc.push(data[i].set_description)
            set_author.push(data[i].user_name);
            kcal.push(data[i].kcal);
            img.push(res.get('photo'))
        }
    } catch (error) {
        console.log(error)
    }
    const txt = 'Twoje zestawy treningowe'
    res.render('userTraining', {
        user_name: username,
        photo_path: res.get('photo'),
        set_name: set_name,
        set_id: set_id,
        set_dur: set_dur,
        set_desc: set_desc,
        set_author: set_author,
        texth1: txt,
        kcal: kcal,
        img: img
    })
});

router.get('/weight', async function (req, res) {

    const username = res.get('username');

    const id = res.get('id')

    try {
        const curWeight = await user.getUserWeight(id[0].user_id)
        var cw = curWeight[0].user_weight
        if (cw == null) {
            cw = 50
        }
    } catch (error) {
        console.log(error)
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
    var categories
    var cat = []
    try {
        categories = await training.getCategories();
    } catch (error) {
        console.log(error)
    }
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].category != 'custom')
            cat.push(categories[i].category)
    }
    res.render('addNewActivity', {
        user_name: username,
        photo_path: res.get('photo'),
        categories: cat
    })
})
router.post('/newtraining', newTraining)

router.get('/newset', async function (req, res) {
    const username = res.get('username');
    var en = []
    var eid = []

    try {
        const excercise_names = await excercise.getAllExcercises();

        for (var i = 0; i < excercise_names.length; i++) {
            en.push(excercise_names[i].excercise_name)
            eid.push(excercise_names[i].excercise_id)
        }
    } catch (error) {
        console.log(error)
    }
    res.render('userTraining2', {
        user_name: username,
        photo_path: res.get('photo'),
        excercise_names: en,
        excercise_ids: eid
    })
})

router.post('/newset', addSet)

router.get("/delete-act",async function(req,res){
    const userID=res.get('id');
    const trID=req.query.id;
    try{
        var idFromDB=(await training.getTrainingById(trID))[0].user_id;
        if(idFromDB==userID){
            await training.deleteTrainingById(trID)
            
        }
        else
        res.redirect('/home/')
    }
    catch(error){
        console.log(error)
    }
    res.redirect('/home/history')
})

router.post('/sets/start', endSet)

router.get('/sets', async function (req, res) {
    const username = res.get('username');
    res.render('appTraining', {
        user_name: username,
        photo_path: res.get('photo')
    })
})

router.get('/sets/list', async function (req, res) {
    const username = res.get('username');
    var names = [];
    var rep = [];
    var ex_id = [];
    var ex_desc = [];
    var series;
    var setName;
    var btn;
    const setID = req.query.id;
    if (setID == 'all') {
        btn = false;
        try {
            const ex = await excercise.getAllExcercises();
            setName = "Wszystkie ćwiczenia";
            for (var i = 0; i < ex.length; i++) {
                names.push(ex[i].excercise_name);
                ex_id.push(ex[i].excercise_id);
                rep.push('');
                ex_desc.push(ex[i].excercise_description)
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            const ex = await training_sets.getSetDetails(setID)
            series = ex[0].series
            setName = ex[0].set_name
            btn = true;
            for (var i = 0; i < ex.length; i++) {
                names.push(ex[i].excercise_name);
                rep.push((ex[i].excercise_repetiton +' x '));
                ex_id.push(ex[i].excercise_id);
                ex_desc.push(ex[i].excercise_description)
            }
        } catch (error) {
            console.log(error)
        }
    }
    res.render('exerciseList', {
        user_name: username,
        photo_path: res.get('photo'),
        names: names,
        rep: rep,
        ex_id: ex_id,
        set_id: req.query.id,
        button: btn,
        ex_desc: ex_desc,
        series: series,
        setName: setName
    })
})

router.get('/sets/start', async function (req, res) {
    const username = res.get('username');
    var exName = [];
    var exRep = [];
    var exDur = [];
    var series;
    try {
        const set = await training_sets.getSetDetails(req.query.id)
        series = set[0].series
        for (var j = 0; j < series; j++) {
            for (var i = 0; i < set.length; i++) {
                exName.push(set[i].excercise_name)
                exRep.push(set[i].excercise_repetiton)
                exDur.push(set[i].time * set[i].excercise_repetiton)
            }
        }
    } catch (error) {
        console.log(error)
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
    var set;
    try {
        set = await training_sets.getSetDetails(4)
    } catch (error) {
        console.log(error)
    }
    res.render('exerciseList', {
        user_name: username,
        photo_path: res.get('photo'),
        set: set
    })
})

// #endregion

module.exports = router