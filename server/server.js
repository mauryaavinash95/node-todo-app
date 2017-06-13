const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();
app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    var todo = new Todo({
        text: request.body.text,
    });

    todo.save().then((resolve) => {
        response.send(resolve);
        console.log("Request saved sucessfully");
    }, (reject) => {
        response.status(400).send(reject);
        console.log("Save unsuccessful");
    });

});

app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({todos});
        console.log("All todos sent successfully.");
    }, (error) => {
        res.status(400).send(error);
        console.log("Error fetching todo list : ", error);
    });
});


app.post('/user', (request, response) => {
    var user = new User({
        name: request.body.name,
        email: request.body.email,
    });

    user.save().then((resolve) => {
        response.send(resolve);
        console.log("User saved successfully");
    }, (reject) => {
        response.status(400).send(reject);
        console.log("User not saved");
    });
})



app.get('/todos', (request, response) => {

});

app.listen(3000, () => {
    console.log("Started on port 3000");
});

module.exports = { app };