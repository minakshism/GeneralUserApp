const {User} = require("../models/userModel");
const mailer = require("../utils/mailer");

const saveUser = async(user, res)=>{
    try{
        const savedUser =  await user.save();
        
        const html = `Hi ${user.username}, </br> Thanks for the registrations </br></br> Please verify your email by typing this token
    </br> Token :  ${user.activeToken} </br> Click on the link bellow </br>
    <a href="http://localhost:3003/verifyToken">http://localhost:3003/verifyToken</a>`;

    await mailer.sendEmail('minakshi129@gmail.com', user.email, "Verify Token", html);
         res.send("Please verify your email to login");
        
     }catch(err){
         res.status(400).json({error : true, message : err});    
     }
}


const getUser = async(query)=>{
    try{
        const users = await User.findOne(query);
        return users;
    }catch(err){
       throw new Error(err);
        
        
    }
    
}

const findProfiles = async(query)=>{
    try{
        const profiles = await Profile.find(query);
        return profiles;
    }catch(err){
       throw new Error(err);         
    }
}

const findProfile = async(query)=>{
    try{
        const profile = await Profile.findOne(query);
        return profile;
    }catch(err){
       throw new Error(err);         
    }
}

const updateProfile = async(id, obj, res)=>{
    try{
        await Profile.findByIdAndUpdate(id, obj, {new : true});
        res.status(200).json({error:false, message : "updated successfully"});          
     }catch(err){
         console.log(err);
         res.status(400).json({error : true, message : err});    
     }
}

const saveProfile = async(profile, res)=>{
    try{
        await profile.save();
        res.send(profile);
       
    }catch(err){
        
        res.status(400).json({error : true, message : err});    
    }
}


module.exports = {
    saveUser : saveUser,
    getUser : getUser,
    findProfiles : findProfiles,
    findProfile : findProfile,
    updateProfile : updateProfile,
    saveProfile : saveProfile
}