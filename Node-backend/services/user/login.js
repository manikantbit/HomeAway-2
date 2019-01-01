var express = require('express');
const router = express.Router();
var path = require('path');
var mongoose= require('mongoose');
var bcrypt = require('bcrypt');
var multer = require('multer');
const passport = require('passport');
require('../../passport');
//var auth = require('../../route/auth');
const jwt = require('jsonwebtoken');
var User = mongoose.model('User');


function handle_request(msg, callback){
console.log("Inside Log in Request at Backend")
let data = msg;
User.findOne({email: data.email ,type: data.type})
  .then(user => {
    if(!user) {
      /*res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("User does not exists. Please sign up.");*/
        callback("error",null);		
    }
        bcrypt.compare(data.password, user.password)
            .then(function(result) { 
            if (result === true) {

                const body = { email : user.email };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ user : body },'homeaway');
                let output = {
                    token:token,
                    "email":user.email,
                    "first_name": user.first_name,
                    "last_name":user.last_name,
                    "profile_image": user.profile_image !=undefined ? user.profile_image:'',
                    "about": user.profile_image !=undefined ? user.about:'',
                    "city": user.profile_image !=undefined ? user.city:'',
                    "hometown":user.profile_image !=undefined ? user.hometown:'',
                    "company":user.profile_image !=undefined ? user.company:'',
                    "school":user.profile_image !=undefined ? user.school:'',
                    "languages":user.profile_image !=undefined ? user.languages:'',
                    "gender":user.profile_image !=undefined ? user.gender:'',
                    "phone":user.profile_image !=undefined ? user.phone:'',
                    "type":user.type
                  }
                console.log("User logged in successfully", output)
                
            

                callback(null,output)
            } else  {
                callback("error",null);
            }
            })
            .catch(err=>{
                callback("error",null);
                return;
            })
        })
        .catch(err => {
            callback("error",null);
        }
)
}
    

exports.handle_request = handle_request;