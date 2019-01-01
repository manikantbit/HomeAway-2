var bodyParser = require('body-parser');
var kafka = require('../kafka/client');
const mongoose = require('mongoose');
var Property = mongoose.model('Property');

exports.addProp = function(req, res){

    kafka.make_request('addprop',req.body, function(err,results){
        console.log('In addprop');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in adding a new property");
            return;
        }else{
            console.log("Inside else");
            req.session.user.property = results
           res.end(JSON.stringify(results));
            }
        
    });
}

exports.getPropByUser = function(req, res){

    kafka.make_request('getpropuser',req.query, function(err,results){
        console.log('In get prop by user');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in getting property");
            return;
        }else{
            console.log("Inside else");
            res.end(JSON.stringify(results));
            }
        
    });
}

exports.getPropByID = function(req, res){

    kafka.make_request('getpropid',req.query, function(err,results){
        console.log('In get prop by ID');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in getting property");
            return;
        }else{
            console.log("Inside else");
            res.end(JSON.stringify(results));
            }
        
    });
}

exports.updateProp = function(req, res){

    kafka.make_request('updateprop',req.body, function(err,results){
        console.log('In update prop');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in updating property");
            return;
        }else{
            console.log("Inside else");
            req.session.user.property = results
            res.end(JSON.stringify(results));
            }
        
    });
}

exports.getPropbySearch = function(req, res){

    kafka.make_request('getpropsearch',req.query, function(err,results){
        console.log('in prop search');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in updating property");
            return;
        }else{
            console.log("Inside else");
            res.end(JSON.stringify(results));
            }
        
    });
}

exports.propImage = function(req, res){
    let data=new Object();
    console.log(req.files,req.body)
    data["propid"] = req.body.propid
    req.files.forEach(function(item){
        let tag = item.fieldname;
        let value = item.filename;
        data[tag] = value;
    })
    kafka.make_request('upload',data, function(err,results){
        console.log('In image upload');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in uploading images");
            return;
        } else {
            console.log("Inside else");
            res.end(JSON.stringify(results));
            }
        
    });
}
