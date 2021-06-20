const { Router } = require('express');
const wrapper = require('../util/wrapper');

const router = Router();

router.get('/', (req, res) => res.redirect('/products'));

router.get('/about', wrapper(async (req, res) => {
    throw new Error('Simulated Error');
    res.render('about', { title: 'About' });
}));

router.all('*', (req, res) => {
    res.render('404', { title: 'Page Not Found' });
});

module.exports = router;