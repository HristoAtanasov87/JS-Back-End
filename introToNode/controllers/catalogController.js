const layout = require('../views/layout');
const database = require('../util/database');

const html = (items) => `
<div>
    <h1>Catalog</h1>
    <form method="POST" action="/create">
        <label>Name</label>
        <input type="text" name="name">
        <label>S/N</label>
        <input type="text" name="serial">
        <input type="submit" value="submit">
    </form>
    <ul>
        ${items.map(([id, i]) => `<li data-id="${id}">${i.name} - ${i.serial} <a href="/delete?id=${id}">[Delete]</a></li>`).join('')}
    </ul>
    
</div>`;

function catalogController(req, res) {
    res.write(layout(html(Object.entries(database.database), 'Catalog')));
    res.end();
};

module.exports = catalogController;