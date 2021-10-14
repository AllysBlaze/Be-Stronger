const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const accessTokenSecret = require('../config')
const {authenticateRoute,parseJwt}=require('../middleware/authToken')


router.get('/', function (req, res) {
    const username=parseJwt(req.cookies['id']).username;
    res.send(`Czesc ${username}`)
});

module.exports=router