const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {authenticateRoute,parseJwt}=require('../middleware/authToken')
const {getUserExtended} =require('../models/user')



router.get('/', async function (req, res) {
    const username=parseJwt(req.cookies['id']).username;
    const user_data= await getUserExtended(username)[0]
    res.send(user_data)
});

module.exports=router