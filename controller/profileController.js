const multer = require("multer");
const fs = require("fs");
const {Profile} = require("../models/profileModel");
const {getUser, saveProfile} = require("../services/getUser");

 

const postProfile = async(req, res, next)=>{
    try{
        const currentUser = await getUser({_id : req.user._id});
    

        const profile = new Profile({
            name : req.body.name,
            age : req.body.age,
            phone : req.body.phone,
            user : currentUser._id,

        });

        if(req.file){
            profile.avatar = req.file.path;
        }
    
    
        
        // Save profile
    
        await saveProfile(profile, res);
        
    }catch(err){
            console.log(err);
    }
}


const getProfiles = async(req, res, next)=>{
    const currentUser = await getUser({_id : req.user._id});
   
    const profileList = await findProfiles({user : currentUser._id});
    res.send(profileList);
}

module.exports = {
    postProfile : postProfile,
    getProfiles : getProfiles
}
