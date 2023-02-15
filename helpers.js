const extractServerInfo = () => {
    return { path: "./db/db.sqlite", host: "127.0.0.1", port: 8080 };
};
module.exports = {
    extractServerInfo,
};
