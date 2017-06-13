const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");

var id = "593f994844ea36337010b2af";

Todo.find({
    _id : id
}).then((todos) => {
    console.log("Todos ", todos);
});

Todo.findOne({
    completed: false,
}).then((todo) => {
    console.log("First Todo found is: ", todo);
});

Todo.findById(id).then((todo)=>{
    console.log("Todo by ID is : ", todo);
}); 