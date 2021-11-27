const pool = require('../utils/connection');

// RODZAJE TRENINGÓW
const getTrainingCategories=(values)=>{ //user_id
    return new Promise((resolve,reject)=>{
        pool.query('SELECT training_category, COUNT(training_category) AS training_count'
        +' FROM trainings WHERE user_id= ? AND '
        +' YEAR(training_date)= ?  '
        +' AND MONTH(training_date) = ? '
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
        pool.query('SELECT COUNT(*) AS training_count,week(training_date,1) AS "week", '
        +' SUM(TIME_TO_SEC(training_duration)) AS "time",'
        +' SEC_TO_TIME(SUM(TIME_TO_SEC(training_duration))) AS "time_label"'
        +' FROM trainings'
        +' WHERE user_id= ? AND '
        +' YEAR(training_date)= ? AND '
        +' MONTH(training_date) = ? '
        +' GROUP BY week(training_date,1)'
        +' ORDER BY week(training_date,1) ',values,(error,elements)=>{
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const progress={getTrainingCategories,getTrainingWeeklyProgress}

module.exports=progress