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
        pool.query('SELECT user_name,user_password FROM users WHERE user_name= ?',values,(error,elements)=>{
            if (error){
                return reject(error) 
            }
            return resolve(elements); 
        });
    });
};

getUserExtended=(values)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users WHERE user_name= ?',values,(error,elements)=>{
            if (error){
                return reject(error) 
            }
            console.log(elements)
            return resolve(elements); //zwraca wszystkie info o użytkowniku
        });
    })
}

updateUser=(weigth,height,birth,gender,id)=>{
    const values=[weigth,height,birth,gender,id];
    return new Promise((resolve,reject)=>{
        pool.query('UPDATE users SET user_weigth= ? ,user_height= ? ,user_birth= ? , user_gender = ? '+
        'WHERE user_id= ? ',values,(error,elements)=>{
            if (error){
                return reject(error) 
            }
            return resolve(elements); 
        });
    })

}

module.exports = {addUser,getUser,updateUser, getUserExtended};