const { Schema, model } = require('mongoose');

const NAME_PATTERN = /^[a-zA-Z0-9 ]+$/;
const IMG_PATTERN = /^https?:\/\//;

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Cube name is required'],
        minLength: [5, 'Cube name must be at least 5 characters'],
        match: [NAME_PATTERN, 'Cube name may contain only latin letters and numbers']
    },
    description: {
        type: String,
        required: [true, 'Cube description is required'],
        minLength: [5, 'Cube description must be at least 5 characters'],
        maxLength: [500, 'Cube description must be less than 500 characters'],
        match: [NAME_PATTERN, 'Cube description may contain only latin letters and numbers']
    },
    imageUrl: {
        type: String,
        required: [true, 'Cube imageUrl is required'],
        match: [IMG_PATTERN, 'Cube imageUrl must be a valid URL']
    },
    difficulty: { type: Number, min: 1, max: 6 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});



module.exports = model('Cube', schema);