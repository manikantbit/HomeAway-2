var connection =  new require('./kafka/Connection');
var app = require('./app');
//topics files
var Signup = require('./services/user/signup');
var Login = require('./services/user/login')
var Logout = require('./services/user/logout');
var GetProfile = require('./services/user/getProfile');
var PostProfile = require('./services/user/postProfile');
var AddProp = require('./services/property/addProp');
var GetProp = require('./services/property/getProp');
var GetPropById = require('./services/property/getPropById');
var GetPropByUser = require('./services/property/getPropByUser');
var UpdateProp = require('./services/property/updateProp');
var Order = require('./services/order/order');
var MyTrip = require('./services/order/mytrip');
var PostMessage = require('./services/user/postMessage');
var GetMessage = require('./services/user/getMessage');
var Avatar = require('./services/user/avatar');
var ImageUpload = require('./services/property/imageUpload');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        console.log(data.data)
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
handleTopicRequest("login",Login)
handleTopicRequest("signup",Signup)
handleTopicRequest("logout",Logout)
handleTopicRequest("getprofile",GetProfile)
handleTopicRequest("postprofile",PostProfile)
handleTopicRequest("addprop", AddProp)
handleTopicRequest("getpropsearch",GetProp)
handleTopicRequest("getpropid",GetPropById)
handleTopicRequest("getpropuser", GetPropByUser)
handleTopicRequest("updateprop",UpdateProp)
handleTopicRequest("postorder",Order)
handleTopicRequest("getorder",MyTrip)
handleTopicRequest("postmessage",PostMessage)
handleTopicRequest("getmessage",GetMessage)
handleTopicRequest("avatar",Avatar)
handleTopicRequest("upload",ImageUpload)