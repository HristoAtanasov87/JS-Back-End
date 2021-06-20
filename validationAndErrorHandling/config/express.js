const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const auth = require('../middlewares/auth');

module.exports = (app) => {

    //handlebars setup
    app.engine('.hbs', hbs({
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');

    //static files setup
    app.use('/static', express.static('static'));
    app.use('/js', express.static('js'));
    //setup body-parser
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    //setup auth middleware
    app.use(auth());
}