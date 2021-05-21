const layout = require('../views/layout');

const homePage = `
<div>
    <h1>My Page</h1>
    <p>Welcome</p>
</div>
`;

function homeController(req, res) {
    res.write(layout(homePage));
    res.end();

}

module.exports = homeController;