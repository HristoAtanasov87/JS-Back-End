const http = require('http');
const aboutController = require('./controllers/aboutController');
const catalogController = require('./controllers/catalogController');
const homeController = require('./controllers/homeCOntroller');
const router = require('./router');

router.registerHandler('/', homeController);
router.registerHandler('/about', aboutController);
router.registerHandler('/catalog', catalogController);

const port = 3000;
const server = http.createServer(requestHandler);


function requestHandler(req, res) {
    console.log('>>>', req.method, req.url);
    const handler = router.match(req.url);
    handler(req, res);
}

server.listen(port, () => console.log('Server listening on port ' + port));