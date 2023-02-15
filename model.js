const { PromisedDatabase } = require("promised-sqlite3");
const db = new PromisedDatabase();

async function initDatabase(path) {
    await db.open(path);
    await db.createTable("todo", true, [
        "id INTEGER PRIMARY KEY AUTOINCREMENT",
        "task TEXT NOT NULL",
        "completed BOOLEAN NOT NULL",
    ]);
}

async function getTask(id) {
    return await db.get("SELECT * FROM todo WHERE id = ?", id);
}

async function getAllTasks() {
    return await db.all("SELECT * FROM todo");
}

async function addTask(task) {
    const statement = await db.insert("todo", {
        task: task.text,
        completed: task.completed,
    });
    task.id = statement.lastID;
    return task;
}

async function updateTask(task) {
    await db.run(
        "UPDATE todo SET task = $title, completed = $completed WHERE id = $id",
        {
            $id: task.id,
            $title: task.task,
            $completed: task.completed,
        }
    );
    return task;
}

async function deleteTask(id) {
    await db.run("DELETE FROM todo WHERE id = ?", id);
}
export default {
    initDatabase,
    getTask,
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
};
