module.exports = {
    details: async (req, res) => {
        const cube = await req.storage.getById(req.params.id);

        if (cube === undefined) {
            res.redirect('/404');
        } else {
            const ctx = {
                title: 'Cubicle',
                cube
            }
            res.render('details', ctx);
        }

    },
    attach: async (req, res) => {
        const cube = await req.storage.getById(req.params.id);
        const accessories = await req.storage.getAllAccessories(cube.accessories.map(a => a._id));

        res.render('attach', {
            title: 'Attach stickers',
            cube,
            accessories
        })
    },
    attachPost: async (req, res) => {
        const cubeId = req.params.cubeId;
        const stickerId = req.body.accessory;

        await req.storage.attachSticker(cubeId, stickerId);

        res.redirect(`/details/${cubeId}`);
    }

}