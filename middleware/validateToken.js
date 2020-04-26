var jwt = require('jsonwebtoken');
const {tokenScret} = require("../config/db");
var ValidatToken = async(req, res, next)=>{
    const token = req.header("auth-token");
    if(!token) return res.status(400).send("Access Denied");
    try{
        const verified = await jwt.verify(token, tokenScret);
        req.user = verified;
        
        next();
    }catch(err){
        res.status(401).send(err.message);
    }
}

module.exports = {ValidatToken : ValidatToken};