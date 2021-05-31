//initialize express app
//setup handlebars
//setup static files
//setup storage middleware
//set route handlers(controller actions)

const express = require('express');
const hbs = require('express-handlebars');

const { init: storage } = require('./models/storage');

const { catalog } = require('./controllers/catalog');
const { about } = require('./controllers/about');
const { details } = require('./controllers/details');
const { create, post: createPost } = require('./controllers/create');
const { notFound } = require('./controllers/notFound');
const { edit, post: editPost } = require('./controllers/edit');

start();
async function start() {

    //initialize express app
    const app = express();
    const port = 3000;

    //handlebars setup
    app.engine('.hbs', hbs({
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');
    //static files setup
    app.use('/static', express.static('static'));
    app.use('/js', express.static('js'));
    app.use(express.urlencoded({ extended: false }));
    app.use(await storage());

    //register controllers(handlers)
    app.get('/', catalog);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.get('/create', create);
    app.post('/create', createPost);
    app.get('/edit/:id', edit);
    app.post('/edit/:id', editPost);
    app.all('*', notFound);


    app.listen(port, () => console.log(`Server listening on port ${port}.`));
}