const url = require("url");
const http = require("http");
const controllers = require("./controllers");
const model = require("./model");
require("dotenv").config();

const server = http.createServer((req, res) => {
    if (url.parse(req.url).path.slice(1).split("/")[0] !== "todo") {
        controllers.sendResponse(res, 404, "Invalid URL");
        return;
    }
    switch (req.method) {
        case "GET":
            if (url.parse(req.url).path.slice(1).split("/")[1]) {
                controllers.getTask(req, res);
            } else {
                controllers.getAllTasks(req, res);
            }
            break;
        case "POST":
            controllers.addTask(req, res);
            break;
        case "PATCH":
            controllers.updateTask(req, res);
            break;
        case "DELETE":
            controllers.deleteTask(req, res);
            break;
        default:
            controllers.sendResponse(res, 405, "Method Not Allowed");
            return;
    }
});

try {
    model.initDatabase(process.env.DB_PATH);
    server.listen(process.env.PORT);
} catch {
    console.log("Error: Failed to start the server");
    process.exit(-1);
}
