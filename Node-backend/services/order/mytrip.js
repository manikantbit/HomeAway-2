var express = require('express');
const router = express.Router();
var path = require('path');
var mongoose= require('mongoose');
var multer = require('multer');
var Order = mongoose.model('Order');

function handle_request(msg, callback){
    console.log("Inside User trips Request at Backend")
    let data = msg;
    Order.find({email: data.email})
    .then(output=>{
        console.log(output)
        console.log("All Trips:", output)
        callback(null,output)
    })
    .catch(err=>{
        console.log(err)
        callback("error",null);
        return;
    })
}

exports.handle_request = handle_request;