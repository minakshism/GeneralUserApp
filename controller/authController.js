
const bcrypt = require('bcrypt');
const {User} = require("../models/userModel");
const {validateLoggedInUser, validateUser} = require("../services/validation");
const saltRounds = 10;
const {createToken} = require("../libs/createToken");

const {getUser, saveUser} = require("../services/getUser");
const cryptoRandomString = require('crypto-random-string');



const LoginController = async(req, res, next)=>{
    console.log(req.body);
    const {error} = validateLoggedInUser(req.body);
    if(error){ return res.status(400).json({error : true, message : error.details[0].message})};

    // Check if user exists
    try{
        const user = await getUser({email : req.body.email});
        
        if(!user) return res.status(404).send("Email/Password is Invalid");
        if(!user.active) return res.status(404).send("Please verify token");

        // user.comparePassword(req.body.password, (err, match)=>{
        //         if(!match){
        //             return res.status(404).send({error : true, message : "Password is Invalid"});
        //         }
        //         createToken(user, res); 
        // }); 
        
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            console.log("invalid");
            return res.status(400).send({ message: "The password is invalid" });
        }

        createToken(user, res); 
       
    }catch(err){
        res.status(500).send({error : true, message : err.message });
    }
};

const verfyTokenController = async(req, res, next)=>{
    var dateNow = Date.now();
    try{

        const{activeToken} = req.body.activeToken;
    const user = await getUser(activeToken);

    if(!user){
        res.status(401).send("no user found");

    }else if(user.activeExpires < dateNow){
        res.status(401).send("Email Authentication expires Please Register again.");
    }else{
        user.active = true;
        user.activeToken = "";
        user.save();
        res.status(200).send("Successfully verified");

    }

    }catch(error){
        next(error);
    }

}



const registerController = async(req, res, next)=>{
    
    //const {error} = validateUser(req.body);
    var results = validateUser(req.body);
    if(results.error){ return res.status(400).json({error : true, message : error.details[0].message})};

    // Check if user already exists

    const emailExist = await getUser({email : req.body.email});
    if(emailExist) return res.status(404).send("Email aready exists.");

    // Salt password

    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(req.body.password, salt);



    var secretToken = cryptoRandomString({length: 6, type: 'distinguishable'});

    req.body.activeToken = secretToken;
    req.body.active = false;


    const user = new User({
        username: req.body.username,
        password: hashPassword,
        email: req.body.email,
        active: req.body.active,
        activeToken: req.body.activeToken,
        activeExpires : Date.now() + 12 * 36000 *1000
    });



    saveUser(user, res);
    
    
};

module.exports = {
    LoginController : LoginController, 
    registerController : registerController,
    verfyTokenController : verfyTokenController
};