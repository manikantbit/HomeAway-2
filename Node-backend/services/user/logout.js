var mongoose= require('mongoose');

function handle_request(msg, callback){
    console.log("Inside Logout Route at server")
    /*msg.session.user = '';
    msg.session.destroy();*/
    callback(null,"success")
}

exports.handle_request = handle_request;