const express = require('express');
const hbs = require('express-handlebars');
// const bodyParser = require('body-parser').urlencoded({
//     extended: true
// });

const homeController = require('./controllers/homeController');
const catalog = require('./controllers/catalogController');
const storage = require('./util/storage');

async function start() {


    const port = 3000;
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    // app.use(bodyParser)
    app.use('/static', express.static('static'));
    app.engine('.hbs', hbs({
        extname: '.hbs'
    }));

    app.set('view engine', '.hbs');

    app.use(await storage());

    app.get('/', homeController);
    app.use('/catalog', catalog)

    app.listen(port, () => console.log(`Server is listening on ${port}`));

}

start();