const fs = require('fs/promises');
const formidable = require('formidable');

function uploadController(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        console.log(files);
        const filePath = files['file'].path;
        const name = files['file'].name;
        const targetPath = './uploads/' + name;

        await fs.rename(filePath, targetPath);

        res.writeHead(301, {
            'Location': '/catalog'
        });
        res.end();
    });
}

module.exports = uploadController;