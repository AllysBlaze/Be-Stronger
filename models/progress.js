const pool = require('../utils/connection');

// RODZAJE TRENINGÓW
const getTrainingCategories=(values)=>{ //user_id
    return new Promise((resolve,reject)=>{
        pool.query('SELECT training_category, COUNT(training_category) AS training_count'
        +' FROM trainings WHERE user_id= ? '
        +' GROUP BY training_category',values,(error,elements)=>{
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}


//PORÓWNANIE TYGODNIOWE
const getTrainingWeeklyProgress=(values)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT COUNT(*),week(training_date,1), SEC_TO_TIME(SUM(TIME_TO_SEC(training_duration)))'
        +' FROM trainings'
        +' WHERE user_id= ? '
        +' GROUP BY week(training_date,1)',[values],(error,elements)=>{
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const progress={getTrainingCategories,getTrainingWeeklyProgress}

module.exports=progress