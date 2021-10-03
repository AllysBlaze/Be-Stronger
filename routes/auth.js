const express = require('express');
const router = express.Router();


const {signUp,login}=require('../controller/auth')

router.get('/signup', function (req, res, next) {
    res.render('sign-up');
});

router.post('/signup',signUp)

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.post('/login',login)
module.exports = router;