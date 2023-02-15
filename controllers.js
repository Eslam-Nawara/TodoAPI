const getAllTasks = (req, res) => {};
const addTask = (req, res) => {};
const getTask = (req, res) => {};
const deleteTask = (req, res) => {};
const updateTask = (req, res) => {};

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
