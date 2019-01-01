var express = require('express');
const router = express.Router();
var path = require('path');
var mongoose= require('mongoose');
var multer = require('multer');
var Property = mongoose.model('Property');

function handle_request(msg, callback){
    console.log("Inside Update Property Request at Backend")
    let data = msg;
    Property.findOneAndUpdate({propid:data.propid},data)
    .then(output=>{
        console.log(output)
            console.log("Updated Property:", output)
            callback(null,output)
        })
        .catch(err=>{
            console.log(err)
            callback("error",null);
            return;
        })
}    
exports.handle_request = handle_request;