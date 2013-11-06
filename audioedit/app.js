
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var lame = require('lame');
var speaker = require('speaker');
var socket
var filePath;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.post('/upload', function(req, res){
console.log(req.files.uploadedAudio);
var typeCheck = /audio/i;
if(typeCheck.test(req.files.uploadedAudio.type)){
var destination = './audio/' + req.files.uploadedAudio.name;
filePath = destination

    fs.rename(req.files.uploadedAudio.path, destination, function(error) {
            if(error) {
				res.send({
                    error: 'Server error.'
					});
            	return;
            }
 
         	res.send({
				path: destination
            	});
	});
} else {
res.send({
	error: 'Wrong file type.'
	});
}
});

app.get('/stream', function(req,res) {

	var stream = fs.createReadStream(filePath)
	res.writeHead(200, {
        'Content-Type': 'audio/mpeg', 
        'Content-Length': fs.statSync(filePath).size
    });
	stream.on('data', function(data){
		
		res.write(data);
		});
	
	stream.on('end', function(){
		res.end();
		});

});