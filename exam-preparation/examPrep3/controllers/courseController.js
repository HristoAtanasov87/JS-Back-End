const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { errorParser } = require('../util/errorParser'); // kogato validaciite sa v modela

router.get('/create', isUser(), (req, res) => {
    res.render('create');
});

router.post('/create', isUser(), async (req, res) => {
    try {
        const courseData = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            duration: req.body.duration,
            author: req.user._id
        }

        await req.storage.createCourse(courseData);
        res.redirect('/');
    } catch (err) {
        const ctx = {
            errors: errorParser(err), //parsvaneto na greshkite koito idvat ot modela
            courseData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                duration: req.body.duration,

            }
        }
        res.render('create', ctx);
    }
});

router.get('/details/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);

        course.isAuthor = req.user && req.user._id == course.author;
        course.isEnrolled = req.user && course.usersEnrolled.find(u => u._id == req.user._id);
        course.hasUser = Boolean(req.user);

        res.render('details', { course });
    } catch (error) {
        console.log(error.message);
        res.redirect('/404');
    }
});

router.get('/enroll/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);

        if (course.author == req.user._id) {
            throw new Error('Cannot enroll to your own course!');
        }
        console.log(course.usersEnrolled);

        if (course.usersEnrolled.find(u => u == req.user._id)) {
            throw new Error('Cannot enroll more than once!');
        }

        await req.storage.enrollCourse(req.params.id, req.user._id);
        res.redirect('/course/details/' + req.params.id);
    } catch (error) {
        console.log(error.message);
        res.redirect('/course/details/' + req.params.id);
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);

        if (course.author != req.user._id) {
            throw new Error('Cannot delete play you have not created!');
        }

        await req.storage.deleteCourse(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
        res.redirect('/course/details/' + req.params.id);
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);

        if (course.author != req.user._id) {
            throw new Error('Cannot edit course you have not created!');
        }

        res.render('edit', { course });
    } catch (error) {
        console.log(error.message);
        res.redirect('/course/details/' + req.params.id);
    }
});

router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);

        if (course.author != req.user._id) {
            throw new Error('Cannot edit course you have not created!');
        }

        await req.storage.editCourse(req.params.id, req.body);
        res.redirect('/course/details/' + req.params.id);
    } catch (error) {
        const ctx = {
            errors: errorParser(error),
            course: {
                _id: req.params.id,
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                duration: req.body.duration
            }
        }
        res.render('edit', ctx);
    }
});



module.exports = router;