const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest, isUser } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

router.post(
    '/register',
    isGuest(),
    body('email').isEmail().withMessage('Invalid email'),
    body('username').isLength({ min: 3 }).withMessage('Min length 3'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at lkeast 5 characters').bail().matches(/[a-zA-Z0-9]/).withMessage('Password may contain only english letters and numbers'),
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
                throw new Error(message);
            }

            await req.auth.register(req.body.username, req.body.email, req.body.password);

            res.redirect('/'); //TODO change redirect as requirements in the project
        } catch (err) {
            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    username: req.body.username,
                    email: req.body.email
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