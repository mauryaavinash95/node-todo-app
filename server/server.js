const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;
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
        response.send({ todos });
        console.log("All todos sent successfully.");
    }, (error) => {
        res.status(400).send(error);
        console.log("Error fetching todo list : ", error);
    });
});

app.get("/todos/:id", (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        console.log("Object ID not valid");
        return response.status(404).send("Object ID not valid");
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.status(200).send({ todo });
    }).catch((error) => {
        response.status(404).send("Couldn't find the object in the database");
    });
});

app.delete("/todos/:id", (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send("Object ID not valid");
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return response.status(404).send("Object ID not found");
        }
        response.status(200).send({ todo });
    }).catch((error) => {
        response.status(404).send("Some probelem with the object ID");
    });
});

app.patch("/todos/:id", (request, response) => {
    var id = request.params.id;
    var body = _.pick(request.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return response.status(404).send("Object ID not valid");
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completeAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return response.status(404).send("Todo not found");
        }
        response.send({ todo })
    }).catch((error) => {
        response.status(404).send();
    });

})

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

app.listen(port, () => {
    console.log("Started on port " + port);
});

module.exports = { app };