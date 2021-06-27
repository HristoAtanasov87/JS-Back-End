const tripService = require('../services/tripService');

module.exports = () => (req, res, next) => {
    req.storage = {
        ...tripService
    };

    //TODO import and decarate services

    next()
}