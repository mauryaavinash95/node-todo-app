const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log("Some error connecting to DB server");
    }
    console.log("Connected to MongoDB server");

    // db.collection('Todos').insertOne({
    //     text: "Something to do",
    //     completed: false
    // }, (error, result) => {
    //     if (error) {
    //         return console.log("Couldn't add the record ", error );
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: "Avinash",
    //     age: 22,
    //     location: "410206"
    // }, (error, result) => {
    //     if (error) {
    //         return console.log("Couldn't write to dabatabse", error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.close();
});