const User = require('../models/User');

async function createUser(username, hashedPassword) {
    //TODO adapt properties to project requirements

    const user = new User({ username, hashedPassword });

    await user.save();

    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: { $regex: pattern } });

    return user;
}

module.exports = {
    createUser,
    getUserByUsername
}

//TODO app function for finding users by other properties