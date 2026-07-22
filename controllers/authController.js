const User = require("./../models/User")
const bcrypt = require("bcrypt");

const registeruser = async(req,res)=>{
 try{
    const{name,email,password}=req.body;

    
     
    const user = await User.findOne({email:email});

    if(user){
        res.status(400).send("Email Already Exists")
        return ;
    }

    const hashedpassword = await bcrypt.hash(password,10);
 const newUser = new User({
       name:name,
       email:email,
       password:hashedpassword  
    })

    await newUser.save();

    res.status(201).json({
        "message":"user created succesfully",
        user:newUser
    })
}catch(err){
    res.status(500).json({ message :"Internal server error",
        error:err.message});
 }
}

const registerUser =(req,res)=>{
    
}




module.exports={registeruser};