const pool = require('../utils/connection');

const getUserTrainingHistory = (values) => { //user_id
    return new Promise((resolve, reject) => {
        pool.query("SELECT trainings.training_id AS id, trainings.training_category, training_sets.set_name, " +
            "  trainings.training_date,trainings.training_duration, trainings.kcal" +
            " FROM trainings " +
            " LEFT JOIN training_sets ON trainings.training_custom_id=training_sets.set_id " +
            " WHERE trainings.user_id= ? " +
            " ORDER BY trainings.training_date, training_id", values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
    });
};

const getTrainingById = (values) => { //set_id
    return new Promise((resolve, reject) => {
        pool.query("SELECT  user_id FROM trainings WHERE training_id= ? ", values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const deleteTrainingById = (values) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM trainings WHERE training_id= ? ", values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const addNewTraining = (values) => { //[user_id, training_date,training_category,training_duration]
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO trainings' +
            ' (user_id, training_date, training_category, training_duration)' +
            'VALUES (?)', [values], (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements.insertId);
            })
    });
};

const insertCustomTraining = (values) => { //[user_id, training_date,training_duration,training_custom_id]
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO trainings ( training_date, user_id,training_custom_id) VALUES (NOW(), ?) ",
            [values], (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements.insertId);
            })
    });
}

const updateCustomTrainingTime = (values) => { //training_id
    return new Promise((resolve, reject) => {
        pool.query("UPDATE trainings" +
            " JOIN training_sets ON training_custom_id=set_id" +
            " SET trainings.training_duration=training_sets.set_duration" +
            " WHERE training_id= ? ", values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

const updateCustomTrainingKcal = (values) => { //training_id
    return new Promise((resolve, reject) => {
        pool.query("UPDATE trainings" +
            " JOIN training_sets ON training_custom_id=set_id" +
            " SET trainings.kcal=training_sets.kcal" +
            " WHERE training_id= ? ", values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

const updateTrainingKcal = (values) => { //training_id
    return new Promise((resolve, reject) => {
        pool.query("UPDATE trainings" +
            " JOIN training_categories ON training_category=category" +
            " SET trainings.kcal=(TIME_TO_SEC(trainings.training_duration))/3600*training_categories.kcal_per_hour " +
            " WHERE training_id= ? ", values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

async function addCustomTraining(values) { //[user_id, training_custom_id]
    try {
        const id = await insertCustomTraining(values);
        await updateCustomTrainingTime(id);
        await updateCustomTrainingKcal(id);
    } catch (error) {
        console.log(error)
    }
}

const deleteTraining = (values) => { //training_id
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM trainings WHERE training_id= ? ', values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

async function addTraining(values) {
    try {
        const id = await addNewTraining(values);
        await updateTrainingKcal(id);
    } catch (error) {
        console.log(error)
    }
}

const getCategories = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT category FROM training_categories ORDER BY category', (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const training = {
    getUserTrainingHistory,
    addTraining,
    addCustomTraining,
    getCategories,
    getTrainingById,
    deleteTrainingById
}

module.exports = training;