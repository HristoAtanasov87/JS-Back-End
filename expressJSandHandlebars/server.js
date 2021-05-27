const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs({
    // layoutsDir: '', //сменя името на папката layouts
    // defaultLayout: '', //сменя името на main.hbs. В този файл трябва задължително да има {{{body}}}, за да може да интерпретира html-a на мястото на това боди
    extname: '.hbs'
}));

// app.set('views', 'templates'); // сетва името на папката views на нещо друго. примера е templates

app.set('view engine', '.hbs'); // сетва се ако по-долу при извикване на render файла се подава без extension, за да знае експресс с какво да го отвори

app.get('/', (req, res) => {
    const data = {
        user: {
            username: 'pesho'
        },
        name: 'Pesho',
        age: 33,
        items: [
            {
                type: 'money',
                qty: 56
            },
            {
                type: 'gum',
                qty: 10
            }
            // 'money',
            // 'coins',
            // 'gum'
        ]
    }
    res.render('home', data); //ако добавим трети параметър layout можем да имаме различен от основния
});

app.get('/catalog', (req, res) => {
    res.render('catalog', {
        products: [
            {
                type: 'washer',
                qty: 45
            },
            {
                type: 'bolt',
                qty: 10
            }
        ]
    })
})

app.listen(3000, console.log('Server listening on port 3000'));