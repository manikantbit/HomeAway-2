var express = require('express');
var mongoose= require('mongoose');
var User = mongoose.model('User');
var Message = mongoose.model('Message');

function handle_request(msg, callback){
    console.log("Inside Get Message Request at Backend")
    let data = msg;
    let type = data.type
    let getMsg= null
    if(type === "user"){
        getMsg ={sender:data.sender}
    } else {
        getMsg ={receiver:data.receiver} 
    }
    Message.find(getMsg)
    .then(output=>{
        console.log(output)
        console.log("Fetching Messages:", output)
        callback(null,output)
    })
    .catch(err=>{
        console.log(err)
        callback("error",null);
        return;
    })
}

exports.handle_request = handle_request;