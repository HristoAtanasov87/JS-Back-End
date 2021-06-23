const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: [true, 'Title is required!'], minLength: [4, 'Title must be at least 4 characters'] },
    description: { type: String, required: [true, 'Description is required!'], minLength: [20, 'Description must be at least 20 characters'], maxLength: [50, 'Max description length 50 symbols'] },
    imageUrl: { type: String, required: [true, 'Image Url is required!'], match: [/^https?/, 'Image URL must be a valid URL'] },
    duration: { type: String, required: [true, 'Duration is required!'] },
    createdAt: { type: Date, default: Date.now },
    usersEnrolled: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Course', schema);