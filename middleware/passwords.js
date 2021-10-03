const bcrypt = require('bcrypt');
const saltRounds = 10;


hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (error, hash) {
            if (error) {
                return reject(error);
            }
            console.log(hash)
            return resolve(hash);
        });
    });
}

module.exports=hashPassword;