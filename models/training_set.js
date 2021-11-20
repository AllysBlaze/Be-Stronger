const pool = require('../utils/connection');


const createNewSet = (values) => { //[user_id, set_name,]
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO training_sets (set_author_id,set_name) VALUES ( ? ) ', [values], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements.insertId);
        })
    })
}

const addExcerisesToSet = (values) => { //[[excercise,repetition,order,set_id],[excercise,repetition,order,set_id],...]
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO set_excercise (excercise_id,excercise_repetiton,excercise_order,set_id) VALUES ?', [values], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const updateSetDuration = (values) => { //set_id
    return new Promise((resolve, reject) => {
        pool.query('UPDATE training_sets AS tr, ' +
            ' (SELECT set_excercise.set_id,SEC_TO_TIME(SUM( TIME_TO_SEC(single_excercises.excercise_duration) * set_excercise.excercise_repetiton )) AS duration ' +
            ' FROM set_excercise' +
            ' INNER JOIN single_excercises ON single_excercises.excercise_id = set_excercise.excercise_id' +
            ' WHERE set_id= ? ) AS tr2' +
            ' SET tr.set_duration=tr2.duration' +
            ' WHERE tr.set_id=tr2.set_id', values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

const doesNameExists = (values) => { //set_name
    return new Promise((resolve, reject) => {
        pool.query('Select set_id,set_name FROM training_sets WHERE set_name LIKE ? ', values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const getLastNameNumber = (values) => { //set_name
    set_name = values + ' #%'
    return new Promise((resolve, reject) => {
        pool.query("Select set_id, set_name FROM training_sets WHERE set_name LIKE  ? ORDER BY set_id DESC LIMIT 1 ", set_name, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

async function addNewSet(value) { //[[user_id, set_name],[[excercise,repetition,order],[excercise,repetition,order],...]]
    var values=value
    console.log(values)
    try {
        var set_name = values[0][1];
        var user_id = values[0][0]
        const nameExists = await doesNameExists(set_name)
        if (nameExists.length != 0) {
            var number = await getLastNameNumber(set_name)
            if (number.length != 0) {
                number = number[0].set_name.split('#');
                number = parseInt(number[1]) + 1
                set_name = set_name + " #" + number.toString()
            } else {
                set_name = set_name + " #2"
            }
        }
        const id = await createNewSet([user_id, set_name])
        var excData = values[1]
        for (var i = 0; i < excData.length; i++) {
            excData[i].push(id)
        }
        console.log(excData)
        await addExcerisesToSet(excData); //[[excercise,repetition,order,set_id],[excercise,repetition,order,set_id]
        await updateSetDuration(id);

    } catch (error) {
        console.log(error)
    }

}


const getUserSets = (values) => { //user_id
    return new Promise((resolve, reject) => {
        pool.query('SELECT set_id, set_name, user_name, set_duration, set_description FROM training_sets' +
            ' JOIN users ON set_author_id=user_id' +
            ' WHERE set_author_id= ?', values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

const getSets = () => { //user_id
    return new Promise((resolve, reject) => {
        pool.query('SELECT set_id, set_name, user_name, set_duration, set_description FROM training_sets' +
            ' JOIN users ON set_author_id=user_id' ,  (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

const getSetDetails = (values) => { //set_id
    return new Promise((resolve, reject) => {
        pool.query('SELECT excercise_id, excercise_name, excercise_repetiton, excercise_description,' +
            ' TIME_TO_SEC(excercise_duration) AS time' +
            ' FROM set_excercise' +
            ' JOIN single_excercises USING (excercise_id)' +
            ' WHERE set_id= ? ', values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}


trainingSet = {
    addNewSet,
    getSetDetails,
    getSets
};

module.exports = trainingSet;