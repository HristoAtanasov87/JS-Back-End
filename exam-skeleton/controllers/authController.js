const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest, isUser } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

router.post(
    '/register',
    isGuest(),
    body('username').isLength({ min: 3 }).withMessage('Min length 3'), //TODO change according to requirements
    body('rePass').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords don\'t match');
        }
        return true;
    }),
    async (req, res) => {
        const { errors } = validationResult(req);
        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                //TODO improve error messages
                throw new Error('Validation error');
            }

            await req.auth.register(req.body.username, req.body.password);

            res.redirect('/'); //TODO change redirect as requirements in the project
        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    username: req.body.username
                }
            }
            res.render('register', ctx)
        }

    }
);

router.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);

        res.redirect('/'); //TODO change redirect as requirements in the project
    } catch (err) {
        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username
            }
        }

        res.render('login', ctx);
    };
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;