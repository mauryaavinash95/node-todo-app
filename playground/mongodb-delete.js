const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error){
        return console.log("Error connecting to MongoDB server ", error);
    }
    console.log("Connection successful");

    // deleteMany
    // db.collection('Todos').deleteMany({text: "Buy LED"}).then((result) => {
    //     console.log("Deleted the Todo(s)", result);
    // }, (error)=>{
    //     console.log("Error deleting Todo");
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Buy LED'}).then((result) => {
    //     console.log("DeleteONE successful ", result );
    // }, (error)=>{
    //     console.log("Couldn't DeleteOne");
    // });

    db.collection('Todos').findOneAndDelete({completed: true}).then((resolve) =>{
        console.log("findOneAndDelete Successful ", resolve);
    }, (reject)=>{
        console.log("findOneAndDelete Unsuccessful", reject);
    });


    db.close();
});