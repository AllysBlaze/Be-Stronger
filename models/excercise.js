const pool = require('../utils/connection');


const getAllExcercises=()=>{
    return new Promise((resolve, reject) => {
        pool.query('SELECT excercise_name, excercise_id FROM single_excercises ORDER BY excercise_name', (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const getExcerciseId=(values)=>{
    return new Promise((resolve, reject) => {
        pool.query('SELECT excercise_id FROM single_excercises WHERE excercise_name LIKE ? ', [values], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const excercise={
    getAllExcercises,
    getExcerciseId
}
module.exports=excercise;