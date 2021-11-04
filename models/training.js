const pool = require('../utils/connection');
const {category,table,db_name}=require('../config')

getUserTrainingHistory = (values) => { //user_id
    return new Promise((resolve, reject) => {
        pool.query("SELECT trainings.training_id, trainings.training_category, training_sets.set_name, trainings.training_date,trainings.training_duration" +
            " FROM trainings " +
            " LEFT JOIN training_sets ON trainings.training_custom_id=training_sets.set_id " +
            " WHERE trainings.user_id= ? " +
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
        pool.query('INSERT INTO trainings'
        +' (user_id, training_date, training_category, training_duration)'
        + 'VALUES (?)', [values], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    });
};

insertCustomTraining = (values) => { //[user_id, training_date,training_duration,training_custom_id]
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO trainings (user_id, training_date,training_duration,training_custom_id) VALUES = ? ", values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    });
}

updateCustomTrainingTime = (values) => { //set_id
    return new Promise((resolve, reject) => {
        pool.query("UPDATE trainings" +
            " JOIN training_sets ON training_custom_id=set_id" +
            " SET trainings.training_duration=training_sets.set_duration" +
            " WHERE training_category='custom' AND set_id= ? ", values, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            })
    })
}

async function addCustomTraining(values) { //[user_id, training_date,training_duration,training_custom_id]
    try {
        await insertCustomTraining(values);
        await updateCustomTrainingTime(values[3]);
    } catch (error) {
        console.log(error)
    }
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


getCategories=()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT SUBSTRING(COLUMN_TYPE,5) AS cat'
        +' FROM information_schema.COLUMNS'
        +' WHERE TABLE_SCHEMA= "'+ db_name.toString()
            +'" AND TABLE_NAME= "'+table.toString()
            +'" AND COLUMN_NAME= "'+category.toString()+'"',(error,elements)=>{
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
    getCategories
}

module.exports = training;