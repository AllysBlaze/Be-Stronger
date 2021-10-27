const pool = require('../utils/connection');

async function addNewSet(values) { //[[user_id, set_name],[[excercise,repetition,order],[excercise,repetition,order],...]]

    try {
        const id = await createNewSet(values[0])
        var excData = values[1]
        for (var i = 0; i < excData.length; i++) {
            excData[i].push(id)
        }
        await addExcerisesToSet(excData);
        await updateSetDuration(id);

    } catch (error) {
        console.log(error)
    }

}

const createNewSet = (values) => { //[user_id, set_name,]
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO training_sets (set_author_id,set_name) VALUES ?', values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements.insertId);
        })
    })
}

const addExcerisesToSet = (values) => { //[[excercise,repetition,order,set_id],[excercise,repetition,order,set_id],...]
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO set_excercise (excercise_id,excercise_repetiton,excercise_order) VALUES ?', values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const updateSetDuration=(values)=>{ //set_id
    return new Promise((resolve, reject) => {
        pool.query('UPDATE training_sets AS tr, '
            +' (SELECT set_excercise.set_id,SEC_TO_TIME(SUM( TIME_TO_SEC(single_excercises.excercise_duration) * set_excercise.excercise_repetiton )) AS duration '
            +' FROM set_excercise'
            +' INNER JOIN single_excercises ON single_excercises.excercise_id = set_excercise.excercise_id'
            +' WHERE set_id= ? ) AS tr2'
            +' SET tr.set_duration=tr2.duration'
            +' WHERE tr.set_id=tr2.set_id', values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}


//PRZEKOMPLIKOWANE, DO POPRAWY
const getSets=(values)=>{//user_id
    return new Promise((resolve, reject) => {
        pool.query('SELECT set_name, user_name, set_duration FROM training_sets'
            +' JOIN users ON set_author_id=user_id'
            +' WHERE set_author_id=1 '
            +' UNION'
            +' SELECT set_name, user_name, set_duration FROM training_sets'
            +' JOIN users ON set_author_id=user_id', values, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const getSetDetails =(values)=>{//set_id
    return new Promise((resolve, reject) => {
        pool.query('SELECT excercise_name, excercise_repetition '
        +' FROM set_excercise'
        +' JOIN single_excercises USING (excercise_id)'
        +' WHERE set_id= ? ',values,(error,elements)=>{
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        })
    })
}

const getAllSets=()=>{

}

trainingSet = {
    addNewSet,
    getSetDetails,
    getSets
};

module.exports = trainingSet;