# Learnings

## Motivation
While learning any framework, tool or language the 'todo' app is the most basic one which lets us learn about the way things 
get done in that framework, tool or language.

### What does this app do?
This application supports 4 routes given below:
1. POST (`/todo`) : To create a new todo item. Request should be a JSON with key=`text` and value=`Your desired todo entry`. Eg.  `{"text": "To push new code on github"}`
2. GET (`/todos`) : To get a list of all todos stored in your database. (ObjectID(`_id`) obtained from here can be used for methods listed below.)
3. GET (`/todos/objectID`) : To get a specific todo document from todos collection using ObjectID as search parameter.
4. PATCH (`/todos/objectID`) : To update the value of completedAt of the given todo item using ObjectID as search parameter.

## Code
The heart of the application lies in server/server.js <br />

We include various npm packages such as <br />
`express` (For running the server), <br />
`bodyParser` (To read the body contents of the request object), <br />
`mongodb` (To use native methods like ObjectId) <br />
`mongoose` (ODM for mongodb) <br />

Then we make some models and import them in server.js file. <br />

### Why do we need models? <br />
- Mongodb is a NO SQL database, the JSON data is stored as documents in collections, analogous to storing rows in tables in SQL. As we structure the data in column-wise format while inserting in SQL and we specify which values are nullable, which are unique etc., we should have something to do the same in  NO SQL databases. <br />
- Models are the answer to structuring the data in NO SQL, models contain the schema required for that given document. So while inserting the data through a given model it takes care of type-checking, range, trimming, requiiring, etc thus maintaining structural integrity of data.

Then we create new instance of the express server by the statement `var app = express()`, we add all the toppings required for this server on this instance `app` and finally we expose it to a given port(generally 3000) where it listens to requests.

### Dissecting the routing mechanism
Each route needs to be explicitly created in express using `app.<METHOD>(<ROUTE>, <CALLBACK>)`. <br />
<METHOD> is the type of request recieved (POST, GET, PATCH, DELETE) <br/>
<ROUTE> is the URL extension for which this route should perform some action on the server. <br />
<CALLBACK> is generally a function which has 3 parameters `(request, response, next)` where `request` contains the object of the request recieved on the server, `response` contains the object which is going to be returned as a result of the given route and `next` performs the next action to be invoked after doing some activity of the given route.

Consider POST /todo route, <br />
```
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
```

`var todo =  new Todo({text: request.body.text});` creates a new instance of the `Todo` model which contains an object having key-value pair with key as `text` and value as `request.body.text`. Now here we are reading the text attribute from the body of the request object and this is the reason we used the npm package `bodyParser`. This model is then allocated to the `var todo`, so now the mongoose methods like `save`, `find`, `update`, `remove`, `findById` etc can be used over it.

The mongoose methods return a promise on their completion. These promises are of the syntax <br /> 
```
.then((resolve)=>{
      //Do something on successful completion of the method
      }, (reject)=>{
      //Do something on unsuccessful completion of the method
      })
``` 
Promises are enhancements to callbacks. Promises work similar to real-life promises where we either fulfill (resolve) them or break (reject) them.
