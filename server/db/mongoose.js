var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp').then((resolve) => {
    console.log("Connection with MongoDB server successful");
}, (reject) => {
    console.log("Error connecting to MongoDB server");
});

module.exports = {
    mongoose,
}