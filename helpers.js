const openDB = (path) => {};

const sendResponse = (response, statusCode, responseBody) => {
    response.statusCode = statusCode;
    if (responseBody) {
        response.setHeader("Content-Type", "application/json");
        response.write(responseBody);
    }
};

const extractServerInfo = () => {
    return { path: "./db/db.sqlite", host: "127.0.0.1", port: 8080 };
};
module.exports = {
    openDB,
    sendResponse,
    extractServerInfo,
};
