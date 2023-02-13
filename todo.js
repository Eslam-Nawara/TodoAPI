const http = require("http");
const jsonBody = require("body/json");
const helpers = require("./helpers");

const server = http.createServer((request, response) => {
    const { headers, method, url } = request;
    jsonBody(request, response, (err, body) => {
        if (err) {
            helpers.sendResponse(response, 500, "Invalid HTTP protocol");
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
            helpers.sendResponse(response, 404, "Invalid method");
        }
        response.end(JSON.stringify(body));
    });
});

try {
    const { path, host, port } = helpers.extractServerInfo();
    helpers.openDB(path);
    server.listen(port);
} catch {
    console.log("Error: Failed to start the server");
    process.exit(-1);
}
