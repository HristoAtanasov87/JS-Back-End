const layout = require('../views/layout');


const html = `
<div>
    <h1>About Page</h1>
    <p>about us</p>
</div>
`;

function aboutController(req, res) {
    res.write(layout(html, 'About'));
    res.end();
}

module.exports = aboutController;