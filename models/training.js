const pool = require('../utils/connection');


getUserTrainingHistory = (values) => { //user_id
    return new Promise((resolve, reject) => {
        pool.query("SELECT trainings.training_id, trainings.training_category, training_sets.set_name, trainings.training_date,trainings.training_duration" +
            " FROM trainings " +
            " LEFT JOIN training_sets ON trainings.training_custom_id=training_sets.set_id " +
            " WHERE trainings.user_id= ? " +
            " GROUP BY training_custom_id " +
            " ORDER BY trainings.training_date", values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
    });
};


addTraining = (values) => { //[user_id, training_date,training_category,training_duration]
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO trainings (user_id, training_date,training_category,training_duration) VALUES =(?)", values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    });
};

addCustomTraining = (values) => { //[user_id, training_date,training_duration,training_custom_id]
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO trainings (user_id, training_date,training_duration,training_custom_id) VALUES = ? ", values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    });
}

deleteTraining = (values) => { //training_id
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM trainings WHERE training_id= ? ', values, (error, elements) => {
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
    addCustomTraining
}

module.exports = training;