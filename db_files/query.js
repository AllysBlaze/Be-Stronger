const {
    connection,
    pool
} = require('./connection');

addUser = (user_name, user_password) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (user_name,user_password) VALUES ("' + user_name + '","' + user_password + '")', (error, elements) => {
            if (error) {
                return reject(error);
            }
            console.log('Dodano')
            return resolve(elements);
        });
    });
};



module.exports = addUser;