# TodoAPI Server

This is a Node.js server application that provides a RESTful API for a todo list application.

## Installation

| Step | Command | Description |
| --- | --- | --- |
| 1 | `git clone https://github.com/Eslam-Nawara/TodoAPI.git` | Clone this repository to your local machine. |
| 2 | `cd TodoAPI` | Navigate to the project directory. |
| 3 | `npm install` | Install the required dependencies. |
| 4 | `npm start` | Start the server. |

Note: You will need to have Node.js installed on your machine in order to run this server.

## Endpoints

You can interact with the API using an HTTP client such as Postman. Here are the available endpoints:

| Method | URL | Description |
| --- | --- | --- |
| GET | /todos | Get a list of all todos. |
| GET | /todos/:id | Get a specific todo by its ID. |
| POST | /todos | Create a new todo. |
| PUT | /todos/:id | Update a specific todo by its ID. |
| DELETE | /todos/:id | Delete a specific todo by its ID. |

All endpoints expect and return JSON data.

## Configuration

You can configure the server by setting the following environment variables:

- `PORT`: The port number that the server should listen on. Default is `3000`.

You can set these variables by creating a `.env` file in the root directory of the project.
