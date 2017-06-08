const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log("Error connecting to database");
    }
    console.log("Connected to MongoDB server");

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log("All Todos");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch Todos ', error);
    // });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count : ${count}`);
    }, (error) => {
        console.log('Unable to fetch Todos ', error);
    });

    db.collection('Users').find({name: "Avinash"}).count().then((result) =>{
        console.log("Number of users with name: Avinash: ", result);
    }, (error) =>{
        console.log("Couldn't count number of name: Avinash")
    });


    db.close();

}) 