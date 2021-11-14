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

const excercise={
    getAllExcercises
}
module.exports=excercise;