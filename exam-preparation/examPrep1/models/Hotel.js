const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: [true, 'Name must be at least 4 characters'], minLength: 4 },
    city: { type: String, required: [true, 'City must be at least 3 characters'], minLength: 3 },
    imageUrl: { type: String, required: [true, 'Image must be a valid URL'], match: [/^https?/, 'Image must be a valid URL'] },
    rooms: { type: Number, required: [true, 'Free rooms are required'], min: 1, max: 100 },
    bookedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model('Hotel', schema);