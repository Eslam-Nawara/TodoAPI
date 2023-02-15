const { PromisedDatabase } = require("promised-sqlite3"); // import the class
const db = new PromisedDatabase();

const GetTasks = (req, res) => {};
const AddTask = (req, res) => {};
const GetTask = (req, res) => {};
const DeleteTask = (req, res) => {};
const UpdateTask = (req, res) => {};

async function InitDatabase(path) {
    await db.open(path);
    await db.createTable("todo", true, [
        "id INTEGER PRIMARY KEY AUTOINCREMENT",
        "task TEXT NOT NULL",
        "completed BOOLEAN NOT NULL",
    ]);
    await db.close();
}

const SendResponse = (res, statusCode, responseBody) => {
    res.statusCode = statusCode;
    if (responseBody) {
        res.setHeader("Content-Type", "application/json");
        res.write(responseBody);
    }
    res.end();
};

module.exports = {
    GetTasks,
    AddTask,
    GetTask,
    DeleteTask,
    UpdateTask,
    InitDatabase,
    SendResponse,
};
