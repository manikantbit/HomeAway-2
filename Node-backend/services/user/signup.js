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
    console.log("Inside Sign Up Request at Backend")
    let data = msg;
    User.findOne({email: data.email ,type: data.type})
    .then(user => {
        if(user) {
        /*res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("User does not exists. Please sign up.");*/
            callback("error",null);		
        }
        const body = { email : data.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'homeaway');
        //Send back the token to the user  
    User.create({ email:msg.email, password:msg.password, first_name:msg.first_name,last_name:msg.last_name,type:msg.type })
    .then(response=>{
        let output = {
            token:token,
            email:data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            type:data.type,
            profile_image:'',
            about:'',
            city:'',
            hometown:'',
            company:'',
            school:'',
            languages:'',
            gender:'',
            phone:'',
            }
        console.log("User signed up successfully", output)
        callback(null,output)
    })
    .catch(err =>{
        console.log("user error")
        callback(err,null);
    })
})
.catch(err =>{
    console.log("last error")
    callback(err,null);
})
}

exports.handle_request = handle_request;