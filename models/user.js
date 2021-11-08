const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id : {type: Number,required: true},
    first_name : {type: String, required: true},
    last_name : {type: String, required: true},
    level : {type: Number, required: true},
    register_at: {type: Number , default: Date.now() }
}, {
    collection: 'member'
})

const model = mongoose.model('Member', UserSchema);

module.exports = model;