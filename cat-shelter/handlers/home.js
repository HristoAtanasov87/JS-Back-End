const url = require('url');
const fs = require('fs');
const path = require('path');
// const cats = require('../data/cats');

module.exports = (req, res) => {
    const pathname = new URL('/', 'http://localhost:3000');

    if (pathname === '/' && req.method === 'GET') {
        //logic for showing home page

        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-type': 'text/plain'
                });

                res.write('404 Not Found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-type': 'text/html'
            });

            res.write(data);
            res.end();
        })

    } else {
        return true;
    }
}