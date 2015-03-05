//主文件
//index.js
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);



//HTTP服务器
//server.js
var http = require("http");
var url = require("url");

function start(route,handle) {
	function Onrequest(request, response) {
		var pathname = url.parse(request.url).pathname;
    	console.log("Request for " + pathname + " received.");
		
		route(handle,pathname,response);
		
//		response.writeHead(200, {"Content-Type": "text/plain"});
//		response.write("Hello World!");
//		response.end();
	}

	http.createServer(Onrequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;






//路由器
//router.js
function route(handle, pathname, response) {
  console.log("About to route a request for " + pathname);
  
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;



//请求处理模块
//requestHandlers.js
var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
















