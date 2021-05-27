const parseForm = require('../util/formParser');

const database = require('../util/database');

async function createController(req, res) {
    const body = await parseForm(req);

    database.addItem(body);

    res.writeHead(301, {
        'Location': '/catalog'
    });
    res.end();

}

module.exports = createController;