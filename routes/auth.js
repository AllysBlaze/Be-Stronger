const express=require('express');
const router=express.Router();

const addUser=require('../db_files/query')

router.get('/signup',function(req, res){addUser('test1','test1')});
router.post('/login');

module.exports=router;