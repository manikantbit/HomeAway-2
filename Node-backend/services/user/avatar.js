var express = require('express');
const router = express.Router();
var path = require('path');
var mongoose= require('mongoose');
var User = mongoose.model('User');

function handle_request(msg, callback){
    console.log("Inside Upload Avatar Request at Backend")
    let data = msg;
    console.log(msg);
    let pic = {profile_image:msg.profile_image}
    User.findOneAndUpdate({email:data.email},pic)
    .then(output=>{
            console.log("Avatar:", pic)
            callback(null,pic)
    })
    .catch(err =>{
        console.log(err)
        callback("error",null);
        return;
    })
}

exports.handle_request=handle_request;