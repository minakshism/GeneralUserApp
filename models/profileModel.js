const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var profileSchema =  Schema({
    name : {type : String},
    age : {type : String},
    phone : {type : String},
    avatar : {type : String},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }

});

const Profile = mongoose.model('Profile', profileSchema);


module.exports = {Profile : Profile};