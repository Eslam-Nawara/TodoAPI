const database = require('./model');
const jsonBody = require('body/json');

const handelGetAllTasks = async (_req, res) => {
  try {
    const tasks = await database.getAllTasks();
    sendResponse(res, 200, JSON.stringify(tasks));
  } catch {
    sendResponse(res, 500);
  }
};

const handelAddTask = async (req, res) => {
  jsonBody(req, res, async (err, body) => {
    if (err) {
      sendResponse(res, 500, 'Invalid HTTP protocol');
      return;
    }
    try {
      const newTask = await database.addTask(body);
      sendResponse(res, 200, JSON.stringify(newTask));
    } catch {
      sendResponse(res, 500);
    }
  });
};

const handelGetTask = async (req, res) => {
  const id = req.url.split('/')[2];
  try {
    if (!isNaN(parseInt(id))) {
      const task = await database.getTask(id);
      sendResponse(res, 200, JSON.stringify(task));
    } else {
      sendResponse(res, 400, 'Invalid Request');
    }
  } catch {
    sendResponse(res, 500);
  }
};
const handelDeleteTask = async (req, res) => {
  const id = req.url.split('/')[2];

  try {
    if (!isNaN(parseInt(id))) {
      await database.deleteTask(id);
      sendResponse(res, 200);
    } else {
      sendResponse(res, 400, 'Invalid Request');
    }
  } catch {
    sendResponse(res, 500);
  }
};
const handelUpdateTask = async (req, res) => {
  jsonBody(req, res, async (err, body) => {
    if (err) {
      sendResponse(res, 500, 'Invalid HTTP protocol');
      return;
    }
    try {
      const task = await database.updateTask(body);
      sendResponse(res, 200, JSON.stringify(task));
    } catch {
      sendResponse(res, 500);
    }
  });
};
const handelRequest = (req, res) => {
  if (req.url.split('/')[1] !== 'todo') {
    sendResponse(res, 404, 'Invalid URL');
    return;
  }
  switch (req.method) {
    case 'GET':
      if (req.url.split('/')[2]) {
        handelGetTask(req, res);
      } else {
        handelGetAllTasks(req, res);
      }
      break;
    case 'POST':
      handelAddTask(req, res);
      break;
    case 'PATCH':
      handelUpdateTask(req, res);
      break;
    case 'DELETE':
      handelDeleteTask(req, res);
      break;
    default:
      sendResponse(res, 405, 'Method Not Allowed');
  }
};
const sendResponse = (res, statusCode, responseBody) => {
  res.statusCode = statusCode;
  if (responseBody) {
    res.setHeader('Content-Type', 'application/json');
    res.write(responseBody);
  }
  res.end();
};

module.exports = {
  handelRequest
};
