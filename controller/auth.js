const {addUser,getUserPassword} = require('../model/user');


const passwordMatch=async function(user_password,confirm_password){
    console.log('here')
    return user_password===confirm_password;
}
const signUp = async(req,res)=>{
    
    const pass=req.body.user_password;
    const conf=req.body.confirm_password;
    const doPasswordsMatch=await(passwordMatch(pass,conf));
    if(doPasswordsMatch){
        
        //await addUser([req.body.user_name,pass])
        await addUser([req.body.user_name,pass])
        return;
    }
    return //ERROR
}

module.exports=signUp;