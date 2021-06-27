const User = require('../models/User');

async function createUser(email, hashedPassword, gender) {
    //TODO adapt properties to project requirements

    const user = new User({ email, hashedPassword, gender });

    await user.save();

    return user;
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await User.findOne({ email: { $regex: pattern } }).populate('history').lean();

    return user;
}

module.exports = {
    createUser,
    getUserByEmail
}

//TODO app function for finding users by other properties