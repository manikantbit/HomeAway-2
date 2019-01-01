var bodyParser = require('body-parser');
var kafka = require('../kafka/client');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport  = require('passport');
const mongoose = require('mongoose');
var User = mongoose.model('User');

exports.login = function(req, res){

    kafka.make_request('login',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong username/password");
            return;
        }else{
            console.log("Inside else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 

                res.end(JSON.stringify(req.session.user));
            }
        
    });
}

exports.session = function(req, res){

    console.log("===============>",req.session.id);

    res.json(req.session.user);
    res.end();
}

exports.signup = function(req, res){

    kafka.make_request('signup',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Email ID already exists");
            return;
        }else{
            console.log("Inside else");
            console.log(req.session.id)
            req.session.user = results;
            req.session.save();
            res.end(JSON.stringify(results));
            }
        
    });
}

exports.logout = function(req, res){

    console.log("Inside Logout Route at server")
    req.session.user = '';
    req.session.destroy();
    res.end();
    /*kafka.make_request('logout',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in logout");
            return;
        }else{
            console.log("Inside else");
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
                })

                res.end(JSON.stringify(results));
            }
        
    });*/
}

exports.getProfile = function(req, res){
    
    kafka.make_request('getprofile',req.query, function(err,results){
        console.log('in result');
        
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in getting profile");
            return;
        }else{
            console.log("Inside else");

            console.log(results);

            res.end(JSON.stringify(results));
            }
        
    });

}

exports.postProfile = function(req, res){
    kafka.make_request('postprofile',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in updating profile");
            return;
        }else{
            console.log("Inside else");
            req.session.user = { ...req.session.user , ...results };

            res.end(JSON.stringify(results));
            }
        
    });
}

exports.postMessage = function(req, res){
    kafka.make_request('postmessage',req.body, function(err,results){
        console.log('Posting messages');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in posting messages");
            return;
        }else{
            console.log("Inside else");
            console.log()
            req.session.user.message = results;

            res.end(JSON.stringify(results));
            }
        
    });
}

exports.getMessage = function(req, res){
    kafka.make_request('getmessage',req.query, function(err,results){
        console.log('Fetching messages');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in fetching messages");
            return;
        }else{
            console.log("Inside else");
            res.end(JSON.stringify(results));
            }
        
    });
}

exports.profileImage = function(req, res){
    kafka.make_request('avatar',{email:req.body.email,profile_image:req.files[0].filename}, function(err,results){
        console.log('Posting avatar');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Error in uploading avatar");
            return;
        }else{
            console.log("Inside else");
            req.session.user = results;
            res.end(JSON.stringify(results));
            }
        
    });
}