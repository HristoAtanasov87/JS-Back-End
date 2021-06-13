const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
    try {
        await req.auth.register(req.body);
        res.redirect('/products');
    } catch (err) {
        const ctx = {
            title: 'Register',
            error: err.message,
            data: { username: req.body.username }
        };
        res.render('register', ctx);
    }

});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });

});

router.post('/login', async (req, res) => {
    try {
        await req.auth.login(req.body);
        res.redirect('/products');
    } catch (err) {
        const ctx = {
            title: 'Login',
            error: err.message,
            data: { username: req.body.username }
        };
        res.render('login', ctx);
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/products');
})

router.get('/delete', (req, res) => {
    res.render('delete', { title: 'Delete' });
});

module.exports = router;