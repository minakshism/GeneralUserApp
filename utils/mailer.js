// file: utils/mailer.js
const mailGun = require("../config/mailerConfig");
var nodemailer = require('nodemailer');

var config = {
    service : 'Mailgun',
    auth : {
        user : mailGun.mailgun_user,
        pass : mailGun.mailgun_password
    },
    tls : {
        rejectUnauthorized : false
    }
};
    
var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: "minakshi129@gmail.com",
    text: 'test text',
};

module.exports = {
    sendEmail(from, to, subject, html){
        return new Promise((resolve, reject)=>{
            transporter.sendMail({from, to, subject, html}, (err, info)=>{
               
                if(err) reject(err);
                resolve(info);
            })   
        });
    }
};

