const pool = require('../utils/connection');

const addUser = (values) => { //wszystkie dane usera
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO users (user_name,email,user_password) VALUES (?)", [values], (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

const getUser = (values) => { //user_email
    return new Promise((resolve, reject) => {
        pool.query('SELECT user_name,user_password FROM users WHERE email= ?', values, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements);
        });
    });
};

const getUserPhoto = (values) => { //user_id
    return new Promise((resolve, reject) => {
        pool.query('SELECT user_photo FROM users WHERE user_id= ?', values, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements);
        });
    });
};

const getUserID = (values) => { //user_name
    return new Promise((resolve, reject) => {
        pool.query('SELECT user_id FROM users WHERE user_name= ?', values, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements);
        });
    });
};


const getUserExtended = (values) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE user_id= ?', values, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements); //zwraca wszystkie info o użytkowniku
        });
    })
}



const updateUser = (weight, height, birth, goal, user_name) => {
    const values = [weight, height, birth, goal, user_name];
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET user_weight= ? ,user_height= ? ,user_birth= ? , training_weekly_time_goal= ? ' +
            ' WHERE user_name= ? ', values, (error, elements) => {
                if (error) {
                    return reject(error)
                }
                return resolve(elements);
            });
    })

}

const updatePhoto = (values) => { //[photo, user_i d]
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET user_photo = ? WHERE user_id= ? ', values, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements);
        });
    })
}


const getUserGoal = (values) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT training_weekly_time_goal AS goal FROM users WHERE user_id= ?', values, (error, elements) => {
            if (error) {
                return reject(error)
            }
            return resolve(elements);
        });
    });
}

const user = {
    addUser,
    getUser,
    updateUser,
    getUserExtended,
    getUserID,
    getUserPhoto,
    getUserGoal,
    updatePhoto
}

module.exports = user;