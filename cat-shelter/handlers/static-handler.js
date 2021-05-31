const fs = require('fs');

function getContentType(url) {
    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('hmtl')) {
        return 'text/html';
    } else if (url.endsWith('jpg') || url.endsWith('jpeg')) {
        return 'image/jpeg';
    } else if (url.endsWith('js')) {
        return 'text/javascript';
    } else if (url.endsWith('png')) {
        return 'image/png';
    }
}

module.exports = (req, res) => {
    const pathname = new URL(req.url, 'http://localhost:3000');
    console.log(pathname.pathname);

    if (pathname.pathname.startsWith('/content') && req.method === 'GET') {
        fs.readFile(`${pathname.pathname}`, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);

                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('Error was found');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(pathname.pathname)
            });

            res.write(data);
            res.end();
        })
    }
}