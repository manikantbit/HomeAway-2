var express = require('express');
const router = express.Router();
var path = require('path');
var mongoose= require('mongoose');
var multer = require('multer');
const passport = require('passport');
var User = mongoose.model('User');

function handle_request(msg, callback){
    console.log("Inside Post Profile Request at Backend")
    let data = msg;
    User.findOneAndUpdate({ email : data.email },data)
    .then( result => {
        console.log(result)
        let output = {
            "email":result.email,
            "first_name": result.first_name,
            "last_name":result.last_name,
            "profile_image": result.profile_image!=undefined?result.profile_image:'',
            "about": result.about!=undefined?result.about:'',
            "city": result.city!=undefined?result.city:'',
            "hometown":result.hometown!=undefined?result.hometown:'',
            "company":result.company!=undefined?result.company:'',
            "school":result.school!=undefined?result.school:'',
            "languages":result.languages!=undefined?result.languages:'',
            "gender":result.gender!=undefined?result.gender:'',
            "phone":result.phone!=undefined?result.phone:'',
            "type":result.type
        }
        console.log("Profile updated:", output)
        callback(null,output)
    })
    .catch(err=>{
        callback("error",null);
        return;
    })
}

exports.handle_request = handle_request;