# Nodo-Todo-API

## A REST API that lets users CRUD todo lists.

Todo API built using [expressjs](https://expressjs.com/), [mongodb](https://www.mongodb.com/) & [mongoosejs](https://mongoosejs.com/).

Basic route handling of various methods in expressjs and managing the mongodb database through those requests.

Clone the repo and run
```
npm install             #to install dependencies.
npm start               #to start the server.
```

Methods used and their structures:
1. POST (`/todo`) : To create a new todo item. Request should be a JSON with key=`text` and value=`Your desired todo entry`. Eg.  `{"text": "To push new code on github"}`
2. GET (`/todos`) : To get a list of all todos stored in your database. (ObjectID(`_id`) obtained from here can be used for methods listed below.)
3. GET (`/todos/objectID`) : To get a specific todo document from todos collection using ObjectID as search parameter.
4. PATCH (`/todos/objectID`) : To update the value of completedAt of the given todo item using ObjectID as search parameter.

To hit the live version of the application use https://backend-todo.herokuapp.com/

###### Since the dynos on heroku sleep after 1 hour of inactivity, the app may be slow to load if loaded for first time within the given hour.
