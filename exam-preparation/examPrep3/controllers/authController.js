const router = require('express').Router();
const { body, validationResult } = require('express-validator'); //kogato validaciite se pravqt v kontrolera
const { isGuest, isUser } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

router.post(
    '/register',
    isGuest(),
    body('username')
        .isLength({ min: 5 })
        .withMessage('Username should be at least 5 characters')
        .bail()
        .isAlphanumeric()
        .withMessage('Username may contain only latin letters and numbers'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters')
        .bail()
        .isAlphanumeric()
        .withMessage('Password may contain only latin letters and numbers'),
    body('rePass')
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('Passwords don\'t match');
            }
            return true;
        }),
    async (req, res) => {
        const { errors } = validationResult(req); // kogato validaciite se pravqt v kontrolera
        try {
            if (errors.length > 0) {
                throw new Error(errors.map(e => e.msg).join('\n'));
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
        let errors = [err.message];
        if (err.type == 'credential') {
            errors = ['Incorrect username or password!']
        }
        const ctx = {
            errors,
            userData: {
                username: req.body.username
            }
        }

        res.render('login', ctx);
    };
});

router.get('/logout', isUser(), (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;