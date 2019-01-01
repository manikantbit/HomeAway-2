var express = require('express');
const router = express.Router();
var path = require('path');
var mongoose= require('mongoose');
var multer = require('multer');
var User = mongoose.model('User');

function handle_request(msg, callback){
    console.log("Inside Get Profile Request at Backend")
    let data = msg;
    User.findOne({
        email: data.email
      }).then(user => {
      let output = {
          "email":user.email,
          "first_name": user.first_name,
          "last_name":user.last_name,
          "profile_image": user.profile_image!=undefined?user.profile_image:'',
          "about": user.about!=undefined?user.about:'',
          "city": user.city!=undefined?user.city:'',
          "hometown":user.hometown!=undefined?user.hometown:'',
          "company":user.company!=undefined?user.company:'',
          "school":user.school!=undefined?user.school:'',
          "languages":user.languages!=undefined?user.languages:'',
          "gender":user.gender!=undefined?user.gender:'',
          "phone":user.phone!=undefined?user.phone:'',
          "type":user.type
      }
      console.log("Profile returned:", output)
      callback(null,output)
    })
    .catch(err=>{
        callback("error",null);
        return;
    })   
}

exports.handle_request = handle_request;