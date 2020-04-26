const {User} = require("../models/User");
const {getUser,  findProfile} = require("../services/getUser");





const validateTodoUser = async(req, res, next)=>{
    const currentUser = await getUser({_id : req.user._id});
    const currentTodo = await findProfile({_id : req.params.id});
  
    if(currentTodo.user.toString()==currentUser._id.toString()){
            next();
    }else{
        res.status(400).json({error : true, message : "You are not the authorized person to eidt or delete this profile"});   
    }
   

}

module.exports = {validateUserProfile};
