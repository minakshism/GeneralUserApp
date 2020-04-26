const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema =  mongoose.Schema({
    
    username: {type:String, required:true},
    password: {type:String, required:true},
   
    email : {type: String, required: true},
    active: {
        type: Boolean,
        default: false
    },
    activeToken: String,
    activeExpires: Date,
});



// userSchema.pre("save", function(next) {
//     if(!this.isModified("password")) {
//         return next();
//     }
//     this.password = bcrypt.hashSync(this.password, 10);
//     console.log(this.password);
//     next();
// });

// userSchema.methods.comparePassword = function(plaintext, callback) {
//   return callback(null, bcrypt.compareSync(plaintext, this.password));
// };



const User = mongoose.model("User", userSchema);


module.exports = {
    User : User
}