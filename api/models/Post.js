const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//https://chat.openai.com/share/002a1169-6878-4c5f-8b87-f4da43c9e5bd

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
}, {
    timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;