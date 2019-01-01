var express = require('express');
const router = express.Router();
var path = require('path');
var mongoose= require('mongoose');
var multer = require('multer');
var Order = mongoose.model('Order');
var Message = mongoose.model('Message');

function handle_request(msg, callback){
    console.log("Inside Order Creation Request at Backend")
    let data = msg;
    console.log(data)
    Order.create(data)
    .then(output=>{
        console.log(output)
        var response = output
        console.log("New Order:", output)
        if(typeof data.description!=="undefined"){
            let msg = {
                sender: data.email,
                receiver: data.owneremail,
                propertyID:data.propid,
                propertyName: data.headline,
                message: {
                    message: data.description,
                    createdDate: data.createdDate
                    },
         }
        Message.create(msg)
        .then(output=>{
            console.log(output)
            console.log("Message created:", output)
        })}
        callback(null,response)
       
    })
    .catch(err=>{
        console.log(err)
        callback("error",null);
        return;
    })
}

exports.handle_request = handle_request;