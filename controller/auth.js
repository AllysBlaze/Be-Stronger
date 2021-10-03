const hashPassword=require('../middleware/passwords');

const {addUser,getUserPassword} = require('../model/user');


const passwordMatch=async function(user_password,confirm_password){
    return user_password===confirm_password;
}
const signUp = async(req,res)=>{
    
    const pass=req.body.user_password;
    const conf=req.body.confirm_password;
    const doPasswordsMatch=await(passwordMatch(pass,conf));
    if(doPasswordsMatch){
        const hashedPass=await hashPassword(pass);
        await addUser([req.body.user_name,hashedPass])
        res.redirect('/')
        return;
    }
    res.redirect('/auth/signup')
    return //ERROR
}

module.exports=signUp;