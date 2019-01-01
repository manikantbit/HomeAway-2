var express = require('express');
var mongoose= require('mongoose');
var User = mongoose.model('User');
var Message = mongoose.model('Message');

function handle_request(msg, callback){
    console.log("Inside Post Message Request at Backend")
    let data = msg;
    let type = data.type
    if(type === "user") {
    var postmsg = { 
        sender: data.sender,
        receiver: data.receiver,
        propertyID:data.propertyID,
        propertyName: data.propertyName,
        message: {message:data.message, createdDate: data.createdDate}
    }
    console.log(postmsg);
    Message.create(postmsg)
    .then(output=>{
        console.log(output)
        console.log("Message created:", output)
        callback(null,output)
    })
.catch(err=>{
        console.log(err)
        callback("error",null);
        return;
    })
} else {
    let update = {
        message1: {message:data.message, createdDate:data.createdDate}
    }
    let query = {msgid: data.msgid}
    Message.findOneAndUpdate(query,update)
    .then(response => {
        if(response){
            Message.find({receiver: response.receiver})
            .then(output=>{
                console.log(output)
                console.log("Message updated:", output)
                callback(null,output)
            })
        }
    })
    .catch(err=>{
                console.log(err)
                callback("error",null);
                return;
            })
    }
}
        
exports.handle_request = handle_request;