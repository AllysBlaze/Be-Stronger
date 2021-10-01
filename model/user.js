const {
    connection,
    pool
} = require('../db_files/connection');
const { get } = require('../routes/auth');

addUser = (values) => { //wszystkie dane usera
    return new Promise((resolve, reject) => {
        console.log(values)
        pool.query("INSERT INTO users (user_name,user_password) VALUES (?)",[values], (error, elements)=> {
            if (error) {
                return reject(error);
            }
            console.log('Dodano')
            return resolve(elements);
        });
    });
};

getUser=(values)=>{ //user_name
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users WHERE user_name= ? LIMIT 1',values,(error,elements)=>{
            if (error){
                return reject(error) //nie znaleziono użytkownika
            }
            return elements[0]; //zwraca wszystkie info o użytkowniku
        });
    });
};

getUserPassword=(values)=>{ //user_name
    return new Promise((resolve,reject)=>{
        pool.query('SELECT user_password FROM users WHERE user_name= ? LIMIT 1',values,(error,elements)=>{
            if (error){
                return reject(error) //nie znaleziono użytkownika
            }
            console.log('Dodano')
            return elements[0].user_password; //zwraca wszystkie info o użytkowniku
        });
    });
};



//UPDATE USER INFO

module.exports = {addUser,getUserPassword};