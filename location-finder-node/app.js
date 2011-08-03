require.paths.unshift('./node_modules');
var amqp = require('amqp');
var http = require('http');
var URL = require('url');
var fs = require('fs');

var vcapServices = JSON.parse(process.env.VCAP_SERVICES);

var rabbitUrl = vcapServices["rabbitmq-2.4"][0].credentials.url;

var connection = amqp.createConnection({url: rabbitUrl});

connection.on('ready', function() {
	console.log("connection ready");
	
	var requestQueue = connection.queue('searchCriteriaQueue');
	
	requestQueue.on('queueDeclareOk', function(args) {
		requestQueue.bind('searchCriteriaQueue');
			
		http.createServer(function(req, res) {
			var url = URL.parse(req.url);
			if (url.query == null && url.pathname.indexOf('/images/') > -1){
				
				fs.readFile(url.pathname.substring(1), function(err, data){
					console.log("loading image: " + url.pathname.substring(1));
					res.writeHead(200, {
						'Content-Type' : 'image/png',	
					    'Content-Length' : data.length
					});
					res.end(data);
				});			
			} 
			else if (url.query == null && url.pathname == '/'){
				res.writeHead(200, {
					'Content-Type' : 'text/html'			
				});
				openHtml(res);
				closeHtml(res);
			}
			else if (url.query != null && url.pathname == '/'){
				
				var msg = url.query.split('=')[1];
				console.log("publishing: " + msg);
				var tempQueueName = new Date().toString();
				var replyQueue = connection.queue(tempQueueName);
				console.log("created reply queue");
				
				replyQueue.on('queueDeclareOk', function(args) {
					replyQueue.bind(tempQueueName);
					console.log("bound reply queue");
					
					replyQueue.subscribe(function(message) {
						res.writeHead(200, {'Content-Type' : 'text/html'});
						openHtml(res);
						res.write(message.data);
						closeHtml(res);
						replyQueue.destroy();
					});
					connection.publish('searchCriteriaQueue', msg, {replyTo:replyQueue.name, contentType:'text'});
				});
			}
	    }).listen(getPort());
	});
});

function getPort(){
	return process.env.VCAP_APP_PORT || 8088;
}

function openHtml(res) {	
	res.write("<html><head><title>Node.JS / RabbitMQ demo</title></head><body>");
	res.write('<table width="100%"><tr><td> <a href="/"><img src="/images/spring09_logo.png" alt="SpringSource/VMWare"/></a></td>' + 
			'<td> <a href="/"><img src="/images/NodeJS.png" alt="SpringSource/VMWare"/></a></td></tr></table><hr>');
	res.write('<b>Enter location (e.g., Kiev or 1600 Pennsylvania av, DC.): </b>');
	res.write('<form method="get"><input name="data"/><input type="submit"/></form><hr>');
}

function closeHtml(res) {
	res.end("</body></html>");
}

String.prototype.startsWith = function(str){
    return (this.indexOf(str) === 0);
}
