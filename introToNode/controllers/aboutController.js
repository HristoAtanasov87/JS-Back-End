const { layout, loadTemplate } = require('../util/template');

async function aboutController(req, res) {
    const aboutPage = await loadTemplate('about')
    res.write(await layout(aboutPage, 'About'));
    res.end();
}

module.exports = aboutController;