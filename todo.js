const http = require("http");
var textBody = require("body");

http.createServer((request, response) => {
    const { headers, method, url } = request;
    textBody(request, response, (err, body) => {
        if (err) {
            res.statusCode = 500;
            return res.end("Invalid HTTP protocol");
        }
        if (method === "GET" && url === "/todo") {
            //handle getAll tasks
        } else if (method === "POST" && url === "/todo") {
            //handle addTask
        } else if (method === "PATCH" && url === "/todo/{id}") {
            //handle editTask
        } else if (method === "GET" && url === "/todo/{id}") {
            //handle getTask
        } else if (method === "DELETE" && url === "/todo/{id}") {
            //handle deleteTask
        } else {
            response.statusCode = 404;
            response.end();
        }
        response.end(body);
    });
}).listen(8080);
