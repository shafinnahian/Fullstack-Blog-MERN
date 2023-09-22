//https://chat.openai.com/share/ca4d0a6e-8009-4fad-afd5-b8f756216b24

const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    username: {type: String, required: true, min: 4, unique: true},
    password: {type: String, required: true},
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;