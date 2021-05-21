const layout = require('../views/layout');

const html = `
<div>
    <h1>Catalog</h1>
    <ul>
        <li>First Item</li>
        <li>Second Item</li>
        <li>Third Item</li>
    </ul>
</div>`;

function catalogController(req, res) {
    res.write(layout(html, 'Catalog'));
    res.end();
};

module.exports = catalogController;