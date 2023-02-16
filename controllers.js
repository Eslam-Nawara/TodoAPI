const url = require("url");
const database = require("./model");
const jsonBody = require("body/json");

const getAllTasks = async (_req, res) => {
    const tasks = await database.getAllTasks();
    const jsonData = JSON.stringify(tasks, null, "  ");
    sendResponse(res, 200, jsonData);
};

const addTask = async (req, res) => {
    jsonBody(req, res, async (err, body) => {
        if (err) {
            sendResponse(res, 500, "Invalid HTTP protocol");
            return;
        }
        try {
            const newTask = await database.addTask(body);
            sendResponse(res, 200, JSON.stringify(newTask));
        } catch {
            sendResponse(res, 400, "Bad Request");
        }
    });
};

const getTask = async (req, res) => {
    const id = url.parse(req.url).path.slice(1).split("/")[1];

    if (!isNaN(parseInt(id))) {
        const task = await database.getTask(id);
        sendResponse(res, 200, JSON.stringify(task));
    } else {
        sendResponse(res, 400, "Invalid Request");
    }
};
const deleteTask = async (req, res) => {
    const id = url.parse(req.url).path.slice(1).split("/")[1];

    if (!isNaN(parseInt(id))) {
        await database.deleteTask(id);
        sendResponse(res, 200);
    } else {
        sendResponse(res, 400, "Invalid Request");
    }
};
const updateTask = async (req, res) => {
    jsonBody(req, res, async (err, body) => {
        if (err) {
            sendResponse(res, 500, "Invalid HTTP protocol");
            return;
        }
        const task = await database.updateTask(body);
        sendResponse(res, 200, JSON.stringify(task));
    });
};

const sendResponse = (res, statusCode, responseBody) => {
    res.statusCode = statusCode;
    if (responseBody) {
        res.setHeader("Content-Type", "application/json");
        res.write(responseBody);
    }
    res.end();
};

module.exports = {
    getAllTasks,
    addTask,
    getTask,
    deleteTask,
    updateTask,
    sendResponse,
};
