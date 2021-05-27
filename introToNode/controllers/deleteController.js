const database = require('../util/database');

function deleteController(req, res) {
    const id = req.url.split('=')[1];
    database.deleteItem(id);

    res.writeHead(301, {
        'Location': '/catalog'
    });
    res.end();
}
module.exports = deleteController;