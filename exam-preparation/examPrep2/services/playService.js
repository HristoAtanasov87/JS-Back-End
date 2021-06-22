const Play = require('../models/Play');

async function getAllPlays(orderBy) {
    let sort = { createdAt: -1 };
    if (orderBy == 'likes') {
        sort = { usersLiked: 'desc' }
    }

    return await Play.find({ public: true }).sort(sort).lean();
}

async function getPlayById(id) {
    return await Play.findById(id).populate('usersLiked').lean();
}

async function createPlay(playData) {
    const pattern = new RegExp(`^${playData.title}$`, 'i');
    const existing = await Play.findOne({ title: { $regex: pattern } });
    if (existing) {
        throw new Error('Play already exists!');
    }
    const play = new Play(playData);

    await play.save();

    return play;
}

async function editPlay(id, playData) {
    const play = await Play.findById(id);

    play.title = playData.title;
    play.description = playData.description;
    play.imageUrl = playData.imageUrl;
    play.public = Boolean(playData.public);

    await play.save();
}

async function deletePlay(id) {
    await Play.findByIdAndDelete(id);
}

async function likePlay(playId, userId) {
    const play = await Play.findById(playId);

    play.usersLiked.push(userId);
    await play.save();
    return play;
}

module.exports = {
    getAllPlays,
    getPlayById,
    createPlay,
    editPlay,
    deletePlay,
    likePlay
}