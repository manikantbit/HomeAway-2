var express = require('express');
const router = express.Router();
var path = require('path');
var mongoose= require('mongoose');
var multer = require('multer');
var Property = mongoose.model('Property');

function handle_request(msg, callback){
    console.log("Inside Search Property Request at Backend")
    let search = msg
        
    Property.find({$and:[{location: 
                {$regex: search.location, $options: 'i'}
                },                       
                    {   availFrom: {
                        $lte :search.availFrom
                            }
                        },
                {availTo: {
                        $gte : search.availTo
                            }
                        },
                { allowedGuest: {
                    $gte:search.allowedGuest
                        }}
                    ]
                })
    .then(output=>{
        console.log(output)
        console.log("Property Results:", output)
        callback(null,output)
    })
    .catch(err=>{
        console.log(err)
        callback("error",null);
        return;
    })
}

exports.handle_request = handle_request;