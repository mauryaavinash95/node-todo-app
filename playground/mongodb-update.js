const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log("Unable to connect to MongoDB server");
    }

    console.log("Connection to MongoDB server succesful");

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5938d8232e9d0a0c15837af3")
    // }, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }
    // ).then((resolve) => {
    //     console.log("Update successful ", resolve);
    // }, (reject) => {
    //     console.log("Some error updating ", reject);
    // })

    db.collection('Users').findOneAndUpdate({
        name: "Avinash"
    }, {
            $set: {
                name: "Avinash42",
            },
            $inc: {
                age: 10,
            }
        }, {
            returnOriginal: false
        }).then((resolve) => {
            console.log("Update successful ", resolve);
        }, (reject) => {
            console.log("Update not successful ", reject);
        });

    db.close();
});