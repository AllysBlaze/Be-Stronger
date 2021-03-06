const pool = require('../utils/connection');


const createNewSet = (values) => { //[user_id, set_name,set_desc,series]
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO training_sets (set_author_id,set_name,set_description,series) VALUES ( ? ) ',
            [values], (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements.insertId);
            })
    })
}



const addExcerisesToSet = (values) => { //[[excercise,repetition,order,set_id],[excercise,repetition,order,set_id],...]
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO set_excercise (excercise_id,excercise_repetiton,excercise_order,set_id) VALUES ?',
            [values], (error, elements) => {
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
            ' (SELECT set_excercise.set_id, ' +
            ' SEC_TO_TIME(SUM( TIME_TO_SEC(single_excercises.excercise_duration) * set_excercise.excercise_repetiton ))  AS duration ' +
            ' FROM set_excercise' +
            ' INNER JOIN single_excercises ON single_excercises.excercise_id = set_excercise.excercise_id' +
            ' WHERE set_id= ? ) AS tr2' +
            ' SET tr.set_duration=SEC_TO_TIME(TIME_TO_SEC(tr2.duration) * series)' +
            ' WHERE tr.set_id=tr2.set_id', values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}


const updateSetKcal = (values) => { //set_id
    return new Promise((resolve, reject) => {
        pool.query('UPDATE training_sets AS tr, ' +
            ' (SELECT set_excercise.set_id, ' +
            ' SUM((single_excercises.kcal_per_100) /100 * set_excercise.excercise_repetiton ) AS kcal ' +
            ' FROM set_excercise' +
            ' INNER JOIN single_excercises ON single_excercises.excercise_id = set_excercise.excercise_id' +
            ' WHERE set_id= ? ) AS tr2' +
            ' SET tr.kcal=tr2.kcal*tr.series' +
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
        pool.query("Select set_id, set_name FROM training_sets WHERE set_name LIKE  ? ORDER BY set_id DESC LIMIT 1 ",
            set_name, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

async function addNewSet(values) { //[[user_id, set_name,set_desc,series],[[excercise,repetition,order],[excercise,repetition,order],...]]

    try {
        var set_name = values[0][1];
        var user_id = values[0][0];
        var set_desc = values[0][2];
        var series = values[0][3];
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
        const id = await createNewSet([user_id, set_name, set_desc, series])
        var excData = values[1]
        for (var i = 0; i < excData.length; i++) {
            excData[i].push(id)
        }
        await addExcerisesToSet(excData); //[[excercise,repetition,order,set_id],[excercise,repetition,order,set_id]
        await updateSetDuration(id);
        await updateSetKcal(id)

    } catch (error) {
        console.log(error)
    }

}


const getUserSets = (values) => { //user_id
    return new Promise((resolve, reject) => {
        pool.query('SELECT set_id, set_name, user_name, set_duration, set_description,kcal FROM training_sets' +
            ' JOIN users ON set_author_id=user_id' +
            ' WHERE set_author_id= ?', values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

const getSets = (values) => { //user_id
    return new Promise((resolve, reject) => {
        pool.query('SELECT set_id, set_name, user_name, set_duration, ' +
            ' set_description, kcal, user_photo FROM training_sets' +
            ' JOIN users ON set_author_id=user_id WHERE user_id!= ? AND user_name NOT LIKE "superKarko" ORDER BY set_id', values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

const getReadySets = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT set_id, set_name, user_name, set_duration, ' +
            ' set_description, kcal, set_photo,user_photo FROM training_sets' +
            ' JOIN users ON set_author_id=user_id WHERE user_name LIKE "superKarko" ORDER BY set_id',
            (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

const getSetDetails = (values) => { //set_id
    return new Promise((resolve, reject) => {
        pool.query('SELECT excercise_id, excercise_name, excercise_repetiton, ' +
            ' excercise_description, series, set_name, ' +
            ' TIME_TO_SEC(excercise_duration) AS time, set_description' +
            ' FROM set_excercise' +
            ' JOIN single_excercises USING (excercise_id)' +
            ' JOIN training_sets USING (set_id) ' +
            ' WHERE set_id= ? ORDER BY excercise_order', values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

const deleteSetExcercise = (values) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM set_excercise WHERE set_id = ?', values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const deletTrainingSet = (values) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM training_sets WHERE set_id = ?', values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

async function deleteSet(values) {
    try {
        await deleteSetExcercise(values);
        await deletTrainingSet(values);
    } catch (error) {
        console.log(error)
    }
}

const getSetAuthorId = (values) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT set_author_id FROM training_sets WHERE set_id = ?', values, (error, elements) => {
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
    getSets,
    getUserSets,
    deleteSet,
    getSetAuthorId,
    getReadySets
};

module.exports = trainingSet;