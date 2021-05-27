const fs = require('fs');
const { send } = require('process');

module.exports = (req, res) => {
    const filename = req.url.slice(8);
    let type;

    if (filename.endsWith('css')) {
        type = 'text/css';
    } else if (filename.endsWith('jpg')) {
        type = 'image/jpeg';
    }

    const file = fs.createReadStream(`./static/${filename}`);
    file.on('error', () => {
        res.statusCode = 404;
        res.write('Not found');
        res.end();
    });

    file.once('data', data => {
        res.writeHead(200, {
            'Content-Type': type
        });
        send(data);
        file.on('data', send);
    });

    file.on('end', () => res.end())

    function send(data) {
        res.write(data);
    }
};