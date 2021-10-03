const {hashPassword,comparePassowrds}=require('../middleware/passwords');

const {addUser,getUser} = require('../model/user');


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



const login=async(req,res)=>{
    const user_name=req.body.user_name;
    const user_password=req.body.user_password;
    const userData= await getUser(user_name);
    if (userData.length===1){
        const resultCompare=await comparePasswords(user_password,userData[0].user_password)
        if(resultCompare){
            req.session.loggedin = true;
			req.session.username = user_name;
            res.redirect('/')
            return
        }
    }
    res.redirect('/auth/login')
    return //error
};

module.exports={signUp,login};