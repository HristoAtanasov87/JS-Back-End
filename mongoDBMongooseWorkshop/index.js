//initialize express app
//setup handlebars
//setup static files
//setup storage middleware
//set route handlers(controller actions)

const express = require('express');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

const { init: storage } = require('./services/storage');

start();

async function start() {
    //initialize express app
    const port = 3000;
    const app = express();

    expressConfig(app);
    await databaseConfig(app);

    app.use(await storage());
    routesConfig(app);


    app.listen(port, () => console.log(`Server listening on port ${port}.`));
}