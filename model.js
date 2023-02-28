const { PromisedDatabase } = require('promised-sqlite3');
const db = new PromisedDatabase();

async function initDatabase(path) {
  await db.open(path);
  await db.createTable('todo', true, [
    'id INTEGER PRIMARY KEY AUTOINCREMENT',
    'item TEXT NOT NULL',
    'completed BOOLEAN DEFAULT false'
  ]);
}

async function getTask(id) {
  return await db.get('SELECT * FROM todo WHERE id = ?', id);
}

async function getAllTasks() {
  return await db.all('SELECT * FROM todo');
}

async function addTask(task) {
  const statement = await db.insert('todo', {
    item: task.item,
    completed: task.completed
  });
  task.id = statement.lastID;
  return task;
}

async function updateTask(task) {
  await db.run(
    'UPDATE todo SET item = $item, completed = $completed WHERE id = $id',
    {
      $id: task.id,
      $item: task.item,
      $completed: task.completed
    }
  );
  return task;
}

async function deleteTask(id) {
  await db.run('DELETE FROM todo WHERE id = ?', id);
}
module.exports = {
  initDatabase,
  getTask,
  getAllTasks,
  addTask,
  updateTask,
  deleteTask
};
