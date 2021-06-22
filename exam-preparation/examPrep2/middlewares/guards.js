function isGuest() {
    return (req, res, next) => {
        console.log(req.user);
        if (!req.user) {
            next();
        } else {
            res.redirect('/');
        }
    };
}

function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

module.exports = {
    isUser,
    isGuest
};