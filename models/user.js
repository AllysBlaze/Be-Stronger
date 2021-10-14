const 
    pool= require('../utils/connection');

addUser = (values) => { //wszystkie dane usera
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO users (user_name,user_password) VALUES (?)",[values], (error, elements)=> {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

getUser=(values)=>{ //user_name
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users WHERE user_name= ?',values,(error,elements)=>{
            if (error){
                return reject(error) //nie znaleziono użytkownika
            }
            return resolve(elements); //zwraca wszystkie info o użytkowniku
        });
    });
};

getUserPassword=(values)=>{ //user_name
    return new Promise((resolve,reject)=>{
        pool.query('SELECT user_password FROM users WHERE user_name= ? LIMIT 1',values,(error,elements)=>{
            if (error){
                return reject(error) //nie znaleziono użytkownika
            }
            return elements[0].user_password; //zwraca wszystkie info o użytkowniku
        });
    });
};



//UPDATE USER INFO

module.exports = {addUser,getUser};