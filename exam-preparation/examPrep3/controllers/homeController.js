const router = require('express').Router();

router.get('/', async (req, res) => {
    if (req.user) {
        let sort = { createdAt: 1 };
        const searchCriteria = req.query.search;
        const courses = await req.storage.getAllCourses(sort, searchCriteria);
        res.render('home-logged-in', { courses });
    } else {
        let sort = { usersEnrolled: -1 };

        const courses = await req.storage.getAllCourses(sort);

        res.render('home-logged-out', { courses });
    }
});

module.exports = router;