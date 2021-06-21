const router = require('express').Router();

router.get('/', async (req, res) => {
    const hotels = await req.storage.getAllHotels();

    res.render('home', { hotels });
})

module.exports = router;