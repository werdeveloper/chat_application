const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,   // Users > Id
        ref: 'User'
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,   // Users > Id
        ref: 'User'
    },
    message: {
        type: String,
        require: true
    }
},
{
    timestamp: true
});

module.exports = mongoose.model('Chat', chatSchema);