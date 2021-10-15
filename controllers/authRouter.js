const jwt = require('jsonwebtoken');

const {
    hashPassword,
    comparePasswords
} = require('../utils/passwords');

const user = require('../models/user');

const {
    accessTokenSecret
} = require('../config')

const login = async (req, res) => {
    const user_name = req.body.username;
    const user_password = req.body.passw;
    const userData = await user.getUser(user_name);
    console.log(accessTokenSecret)
    if (userData.length === 1) {
        const resultCompare = await comparePasswords(user_password, userData[0].user_password)

        if (resultCompare) {
            const accessToken = jwt.sign({
                'access': 'authenticated',
                username: userData[0].user_name
            }, accessTokenSecret);
            var newDate = new Date();
            var expDate = newDate.setMonth(newDate.getMonth() + 3)
            res.cookie('id', accessToken, {
                sameSite: true,
                maxAge: expDate
            });

            res.redirect('/home')
        }
    } else {
        res.send('Username or Password incorrect')
    }
}

const passwordMatch = async function (user_password, confirm_password) {
    return user_password === confirm_password;
}

const signup = async (req, res) => {
    const pass = req.body.user_password;
    const conf = req.body.confirm_password;
    const doPasswordsMatch = await (passwordMatch(pass, conf));
    if (doPasswordsMatch) {
        const hashedPass = await hashPassword(pass);
        await user.addUser([req.body.user_name, hashedPass])
        res.redirect('/login')
        return;
    }
    res.redirect('/sign-up')
    return //ERROR

}

module.exports = {
    login,
    signup
}