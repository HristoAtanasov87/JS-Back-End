const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const { TOKEN_SECRET, COOKIE_NAME } = require('../config');

module.exports = () => (req, res, next) => {
    if (parseToken(req, res)) {
        req.auth = {
            async register(username, email, password) {
                const token = await register(username, email, password);
                res.cookie(COOKIE_NAME, token);
            },
            async login(username, password) {
                const token = await login(username, password);
                res.cookie(COOKIE_NAME, token);
            },
            logout: () => {
                res.clearCookie(COOKIE_NAME);
            },
            async refresh(username) {
                return await refresh(username);
            }
        };

        next();
    }
}


async function register(username, email, password) {
    //TODO adapt parameters to project requirements
    //TODO extra validations depending on the project

    const existUsername = await userService.getUserByUsername(username);
    const existsEmail = await userService.getUserByEmail(email);

    if (existUsername) {
        throw new Error('Username is taken!');
    } else if (existsEmail) {
        throw new Error('Email is taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(username, email, hashedPassword);

    return generateToken(user);
}

async function login(username, password) {
    const user = await userService.getUserByUsername(username);

    if (!user) {
        const err = new Error('No such user');
        err.type = 'credential';
        throw err;
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        const err = new Error('Incorrect password');
        err.type = 'credential';
        throw err;
    }

    return generateToken(user);
}

async function refresh(username) {
    const user = await userService.getUserByUsername(username);

    if (!user) {
        throw new Error('No such user');
    }

    return user;
}

function generateToken(userData) {
    return jwt.sign({
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        bookedHotels: userData.bookedHotels
    }, TOKEN_SECRET);
}

function parseToken(req, res) {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
        } catch (err) {
            res.clearCookie(COOKIE_NAME);
            res.redirect('/auth/login');

            return false;
        }
    }
    return true;
}