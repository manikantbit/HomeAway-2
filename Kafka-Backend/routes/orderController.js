var bodyParser = require('body-parser');
var kafka = require('../kafka/client');
const mongoose = require('mongoose');
var Order = mongoose.model('Order');

exports.Order = function(req, res){

    kafka.make_request('postorder',req.body, function(err,results){
        console.log('In Booking order');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in booking a property");
            return;
        }else{
            console.log("Inside else");
            req.session.user.order =results

            res.end(JSON.stringify(results));
            }
        
    });
}

exports.myTrip = function(req, res){

    kafka.make_request('getorder',req.query, function(err,results){
        console.log('In fetching order');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in fetching orders");
            return;
        }else{
            console.log("Inside else");
            res.end(JSON.stringify(results));
            }
        
    });
}

