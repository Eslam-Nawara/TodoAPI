const { PromisedDatabase } = require("promised-sqlite3"); // import the class
const db = new PromisedDatabase();

async function initDatabase(path) {
    await db.open(path);
    await db.createTable("todo", true, [
        "id INTEGER PRIMARY KEY AUTOINCREMENT",
        "task TEXT NOT NULL",
        "completed BOOLEAN NOT NULL",
    ]);
    await db.close();
}

module.exports = {
    initDatabase,
};
