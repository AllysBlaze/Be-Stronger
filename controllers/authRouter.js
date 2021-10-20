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
    const email = req.body.email;
    const user_password = req.body.passw;
    const userData = await user.getUser(email);
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

const logout=async(req,res)=>{
    res.cookie('id','',{maxAge :1});
    res.redirect('/')
}

const passwordMatch = async function (user_password, confirm_password) {
    return user_password === confirm_password;
}

const signup = async (req, res) => {
    const pass = req.body.user_password;
    const email=req.body.email;
    const conf = req.body.confirm_password;
    const doPasswordsMatch = await (passwordMatch(pass, conf));
    if (doPasswordsMatch) {
        const hashedPass = await hashPassword(pass);
        await user.addUser([req.body.user_name,email, hashedPass])
        res.redirect('/login')
        return;
    }
    res.redirect('/sign-up')
    return //ERROR

}

module.exports = {
    login,
    signup,
    logout
}