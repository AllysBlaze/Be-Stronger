const express = require('express');
const router = express.Router();



const {
    addUser,
    getUserPassword
} = require('../model/user')

const signUp=require('../controller/auth')

//router.get('/signup',function(req, res){addUser(["est1","test1"])});
router.get('/signup', function (req, res, next) {
    res.render('sign-up');
});

router.post('/signup',signUp)

//router.get('/login',function(req, res){getUserPassword(["est1"])});

module.exports = router;