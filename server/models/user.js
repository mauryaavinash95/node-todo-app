var mongoose = require('mongoose');
var User = mongoose.model('Users', {
    name: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = {
    User,
}