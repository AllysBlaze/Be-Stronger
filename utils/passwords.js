const bcrypt = require('bcrypt');
const saltRounds = 10;


hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (error, hash) {
            if (error) {
                return reject(error);
            }
            return resolve(hash);
        });
    });
}

comparePasswords = (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, function (error, result) {
            if (error) {
                return reject(error) //hasła nie pasują
            }
            return resolve(result)
        })
    })
}

module.exports = {
    hashPassword,
    comparePasswords
};