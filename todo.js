const http = require("http");

const helpers = require("./helpers");
const handlers = require("./handlers");

const server = http.createServer((req, res) => {
    if (req.url.split("/")[1] !== "todo") {
        handlers.SendResponse(res, 404, "Invalid URL");
        return;
    }
    switch (req.method) {
        case "GET":
            if (req.url.split("/")[2] != null) handlers.GetTask(req, res);
            else handlers.GetTasks(req, res);
            break;
        case "POST":
            handlers.AddTask(req, res);
            break;
        case "PATCH":
            handlers.UpdateTask(req, res);
            break;
        case "DELETE":
            handlers.DeleteTask(req, res);
            break;
        default:
            handlers.SendResponse(res, 405, "Method Not Allowed");
            return;
    }
    res.end();
});

try {
    const { path, host, port } = helpers.extractServerInfo();
    handlers.InitDatabase(path);
    server.listen(port);
} catch {
    console.log("Error: Failed to start the server");
    process.exit(-1);
}
