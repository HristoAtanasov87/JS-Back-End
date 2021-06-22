const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { errorParser } = require('../util/errorParser');

router.get('/create', isUser(), (req, res) => {
    res.render('create');
});

router.post('/create', isUser(), async (req, res) => {

    try {
        //TODO extract model data and forward to service
        const playData = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            public: Boolean(req.body.public),
            author: req.user._id
        }

        await req.storage.createPlay(playData);
        res.redirect('/');
    } catch (err) {
        //TODO parse mongoose error object


        const ctx = {
            errors: errorParser(err),
            playData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                public: Boolean(req.body.public),
            }
        }
        res.render('create', ctx);
    }

});
router.get('/details/:id', async (req, res) => {
    try {
        const play = await req.storage.getPlayById(req.params.id);

        play.isAuthor = req.user && req.user._id == play.author;
        play.isLiked = req.user && play.usersLiked.find(u => u._id == req.user._id);
        play.hasUser = Boolean(req.user);

        res.render('details', { play });
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }

});

router.get('/delete/:id', isUser(), async (req, res) => {

    try {
        const play = await req.storage.getPlayById(req.params.id);

        if (play.author != req.user._id) {
            throw new Error('Cannot delete play you have not created!');
        }

        await req.storage.deletePlay(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/play/details/' + req.params.id);
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const play = await req.storage.getPlayById(req.params.id);

        if (play.author != req.user._id) {
            throw new Error('Cannot edit play you have not created!');
        }

        res.render('edit', { play })
    } catch (err) {
        console.log(err.message);
        res.redirect('/play/details/' + req.params.id);
    }
});

router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const play = await req.storage.getPlayById(req.params.id);

        if (play.author != req.user._id) {
            throw new Error('Cannot edit play you have not created!');
        }

        await req.storage.editPlay(req.params.id, req.body);
        res.redirect('/');
    } catch (err) {
        const ctx = {
            errors: errorParser(err),
            play: {
                _id: req.params.id,
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                public: Boolean(req.body.public)
            }
        }
        res.render('edit', ctx);

    }
});

router.get('/like/:id', isUser(), async (req, res) => {
    try {
        const play = await req.storage.getPlayById(req.params.id);

        if (play.author == req.user._id) {
            throw new Error('Cannot like your own play!');
        }

        await req.storage.likePlay(req.params.id, req.user._id);
        res.redirect('/play/details/' + req.params.id);
    } catch (err) {
        console.log(err.message);
        res.redirect('/play/details/' + req.params.id);
    }
});

module.exports = router;