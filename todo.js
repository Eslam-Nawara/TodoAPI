const http = require("http");
require("dotenv").config();

const controllers = require("./controllers");
const models = require("./models");

const server = http.createServer((req, res) => {
    if (req.url.split("/")[1] !== "todo") {
        controllers.sendResponse(res, 404, "Invalid URL");
        return;
    }
    switch (req.method) {
        case "GET":
            if (req.url.split("/")[2] != null) controllers.getTask(req, res);
            else controllers.getAllTasks(req, res);
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
    res.end();
});

try {
    models.initDatabase(process.env.DB_PATH);
    server.listen(process.env.PORT);
} catch {
    console.log("Error: Failed to start the server");
    process.exit(-1);
}
