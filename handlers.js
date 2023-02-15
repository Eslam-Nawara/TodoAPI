const { PromisedDatabase } = require("promised-sqlite3"); // import the class
const db = new PromisedDatabase();

const GetTasks = (request, response) => {};
const AddTask = (request, response) => {};
const GetTask = (request, response) => {};
const DeleteTask = (request, response) => {};
const UpdateTask = (request, response) => {};

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
