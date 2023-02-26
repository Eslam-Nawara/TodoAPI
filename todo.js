const http = require("http");
const controllers = require("./controllers");
const database = require("./model");
require("dotenv").config();

const init = async () => {
    try {
        await database.initDatabase(process.env.DB_PATH);
        http.createServer(controllers.handelRequest).listen(process.env.PORT);
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
};

init();
