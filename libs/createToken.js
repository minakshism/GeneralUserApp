const jwt = require('jsonwebtoken');
const createToken = async(user, res)=>{
    try{
        const token = await jwt.sign({_id : user._id}, process.env.TOKENSCRET);
        res.header("auth-token", token).send(token);
    }catch(err){
        console.log(err.message);
    }
    
}

module.exports = {createToken};